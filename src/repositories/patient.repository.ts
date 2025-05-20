import { Op, QueryTypes } from 'sequelize';
import { CreatePatientType } from "../dtos/patient/create-patient.dto";
import { ListPatientType } from "../dtos/patient/list-patient.dto";
import { PatientDTO, PatientType } from "../dtos/patient/patient.schema";
import { UpdatePatientType } from "../dtos/patient/update-patient.dto";
import Patient from "../models/patient.model";
import { FilterPatientType } from '../dtos/patient/filter-patient.dto';
import { AppointmentStatus } from '../enum/appointment-status.enum';
import sequelize from '../config/db-connection';
import { ListAppointmentSchema } from '../dtos/appointment/list-appointment.dto';
import { generateAliasedSelect } from '../utils/generate-aliased-select';
import { AppointmentTypeSchema } from '../dtos/appointment-type/appointment-type.schema';

export class PatientRepository {

  async alterPatient(id: number, newPatientData: UpdatePatientType): Promise<void> {
    await Patient.update({ ...newPatientData }, { where: { id } })
  }

  async createPatient(newPatient: CreatePatientType): Promise<PatientType> {

    const process = await Patient.create(newPatient)

    const patientCreated = new PatientDTO({ ...process.dataValues }).getAll()

    return patientCreated
  }

  async deletePatient(id: number): Promise<void> {
    await Patient.destroy({ where: { id } })
  }

  async listAllPatients(filter?: FilterPatientType): Promise<ListPatientType> {
    const whereClause: any = {}

    if (filter?.search) {
      whereClause[Op.or] = [
        { email: { [Op.iLike]: `%${filter.search}%` } },
        { name: { [Op.iLike]: `%${filter.search}%` } }
      ]
    }

    // Separa filtros de paginação
    const { search = '', page = 1, perPage = 10, ...otherFilters } = filter || {}
    Object.assign(whereClause, otherFilters)

    const offset = (page - 1) * perPage
    const limit = perPage

    const appointmentFields = Object.keys(ListAppointmentSchema.omit({
      patient: true,
    }).shape);

    const appointmentSelect = generateAliasedSelect(
      appointmentFields,
      'a',                        // alias da subquery
      'lastCompletedAppointment' // alias aninhado no resultado
    );

    const appointmentTypeFields = Object.keys(AppointmentTypeSchema.shape);
    
    const appointmentTypeSelect = generateAliasedSelect(
      appointmentTypeFields,
      'a',                        // alias da subquery
      'lastCompletedAppointment.appointmentType', // alias aninhado no resultado
      'appointment_type_'
    );    

    const result = await sequelize.query<PatientType>(`
        SELECT
          p.*,
          ${appointmentSelect},
          ${appointmentTypeSelect}
        FROM "patient" p
        LEFT JOIN LATERAL (
          SELECT 
            "appointment".*, 
            appointment_type.name as appointment_type_name,
            appointment_type.description as appointment_type_description,
            appointment_type.created_at as appointment_type_created_at,
            appointment_type.updated_at as appointment_type_updated_at
          FROM "appointment"
          INNER JOIN "appointment_type" on "appointment_type"."id" = "appointment"."appointment_type_id"
          WHERE "appointment"."patient_id" = p.id AND "appointment"."status" = '${AppointmentStatus.COMPLETED}'
          ORDER BY "date" DESC
          LIMIT 1
        ) a ON true
        WHERE 
          p.name like :search OR 
          p.phone like :search OR
          p.email like :search
        ORDER BY p.id DESC
        LIMIT :limit OFFSET :offset
      `,
      {
        replacements: {
          search: `%${search}%`,
          limit,
          offset
        },
        type: QueryTypes.SELECT,

        nest: true // isso vai transformar "lastCompletedAppointment.id" em { lastCompletedAppointment: { id: ... } }
      });

    const auxResult: PatientType[] = result.map(r => r.lastCompletedAppointment?.id ? { ...r } : { ...r, lastCompletedAppointment: null })

    const total = result.length
    const totalPagesCalc = Math.ceil(total / perPage)

    const from = offset + 1
    const to = offset + result.length

    return {
      data: auxResult,
      meta: {
        page,
        perPage,
        from,
        to,
        count: result.length,
        hasMore: page < totalPagesCalc,
        lastPage: totalPagesCalc,
      },
    }
  }



  async listPatientById(id: number): Promise<PatientType | null> {
    const patient = await Patient.findByPk(id)
    return patient
  }

  async count(): Promise<number> {
    const total = await Patient.count()
    return total
  }
}