import { AppError } from "../config/errors/app.error"
import { CreatePatientDTO, CreatePatientType } from "../dtos/patient/create-patient.dto"
import { PatientType } from "../dtos/patient/patient.schema"
import { UpdatePatientDTO } from "../dtos/patient/update-patient.dto"
import { PatientRepository } from "../repositories/patient.repository"

export class PatientService {

  constructor(
    private repository: PatientRepository
  ) { }

  async alterPatient(id: number, newPatientData: UpdatePatientDTO): Promise<void> {
    await this.listPatientById(id)
    await this.repository.alterPatient(id, newPatientData.getAll())
  }

  async registerPatient(newPatient: CreatePatientDTO): Promise<PatientType> {    
    return await this.repository.createPatient(newPatient.getAll())
  }

  async deletePatient(id: number): Promise<void> {
    await this.listPatientById(id)
    await this.repository.deletePatient(id)
  }

  async listAllPatients(filter?: UpdatePatientDTO): Promise<PatientType[]> {
    return await this.repository.listAllPatients(filter?.getAll())
  }
  
  async listPatientById(id: number): Promise<PatientType> {
    const patient = await this.repository.listPatientById(id)

    if(!patient) {
      throw new AppError('Patient not found', 404)
    }

    return patient
  }
}