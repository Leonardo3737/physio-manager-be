import { AppError } from "../config/errors/app.error"
import { AppointmentFilterDTO } from "../dtos/appointment/appointment-filter.dto"
import { CreatePatientDTO } from "../dtos/patient/create-patient.dto"
import { FilterPatientDTO } from '../dtos/patient/filter-patient.dto'
import { ListPatientType } from '../dtos/patient/list-patient.dto'
import { PatientType } from "../dtos/patient/patient.schema"
import { UpdatePatientDTO } from "../dtos/patient/update-patient.dto"
import { PatientRepository } from "../repositories/patient.repository"
import { AppointmentService } from "./appointment.service"

export class PatientService {

  constructor(
    private repository: PatientRepository,
    private appointmentService: AppointmentService,
  ) { }

  async alterPatient(id: number, newPatientData: UpdatePatientDTO): Promise<void> {
    await this.listPatientById(id)
    await this.repository.alterPatient(id, newPatientData.getAll())
  }

  async registerPatient(newPatient: CreatePatientDTO): Promise<PatientType> {
    return await this.repository.createPatient(newPatient.getAll())
  }

  async deletePatient(id: number, deleteAppointments?: boolean): Promise<void> {
    await this.listPatientById(id)

    const filter = new AppointmentFilterDTO({ patientId: id })

    const patientAppointments = await this.appointmentService.listAllAppointments(filter)

    if (patientAppointments.data.length) {
      if (!deleteAppointments) {
        throw new AppError('Cannot delete patient because it is linked to existing appointments.', 409)
      }
      await this.appointmentService.deleteAppointmentsByPatient(id)
    }

    await this.repository.deletePatient(id)
  }

  async listAllPatients(filter?: FilterPatientDTO): Promise<ListPatientType> {
    return await this.repository.listAllPatients(filter?.getAll())
  }

  async listPatientById(id: number): Promise<PatientType> {
    const patient = await this.repository.listPatientById(id)

    if (!patient) {
      throw new AppError('Patient not found', 404)
    }

    return patient
  }
}