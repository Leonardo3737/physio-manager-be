import { Op } from 'sequelize';
import { CreatePatientType } from "../dtos/patient/create-patient.dto";
import { ListPatientType } from "../dtos/patient/list-patient.dto";
import { PatientDTO, PatientType } from "../dtos/patient/patient.schema";
import { UpdatePatientType } from "../dtos/patient/update-patient.dto";
import Patient from "../models/patient.model";
import { FilterPatientType } from './../dtos/patient/filter-patient.dto';

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
      whereClause[ Op.or ] = [
        { email: { [ Op.iLike ]: `%${filter.search}%` } },
        { name: { [ Op.iLike ]: `%${filter.search}%` } }
      ]
    }

    // Separa filtros de paginação
    const { search, page = 1, perPage = 10, ...otherFilters } = filter || {}
    Object.assign(whereClause, otherFilters)

    const offset = (page - 1) * perPage
    const limit = perPage

    const result = await Patient.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [ [ 'id', 'DESC' ] ], // Ordena por nome, opcional
    })

    const total = result.count
    const totalPagesCalc = Math.ceil(total / perPage)

    const from = offset + 1
    const to = offset + result.rows.length

    return {
      data: result.rows,
      meta: {
        page,
        perPage,
        from,
        to,
        count: result.rows.length,
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