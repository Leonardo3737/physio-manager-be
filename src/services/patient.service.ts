import { CreatePatientDTO, CreatePatientType } from "../dtos/patient/create-patient.dto"
import { PatientType } from "../dtos/patient/patient.schema"
import { UpdatePatientDTO } from "../dtos/patient/update-patient.dto"
import { PatientRepository } from "../repositories/patient.repository"

export class PatientService {

  constructor(
    private repository: PatientRepository
  ) { }

  alterPatient(id: number, newPatientData: UpdatePatientDTO): void {
    this.repository.alterPatient(id, newPatientData.getAll())
  }

  registerPatient(newPatient: CreatePatientDTO): PatientType {    
    return this.repository.createPatient(newPatient.getAll())
  }

  deletePatient(id: number): void {
    this.repository.deletePatient(id)
  }

  listAllPatients(filter?: UpdatePatientDTO): PatientType[] {
    return this.repository.listAllPatients(filter?.getAll())
  }
  
  listPatientById(id: number): PatientType | undefined {
    return this.repository.listPatientById(id)
  }
}