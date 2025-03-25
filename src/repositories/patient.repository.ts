import { CreatePatientType } from "../dtos/patient/create-patient.dto";
import { ListPatientDTO } from "../dtos/patient/list-patient.dto";
import { PatientType } from "../dtos/patient/patient.schema";
import { UpdatePatientType } from "../dtos/patient/update-patient.dto";

export class PatientRepository {

  alterPatient(id: number, newPatientData: UpdatePatientType): void {
    
  }

  createPatient(newPatient: CreatePatientType): PatientType {

    const data = {
      id: 1,
      ...newPatient
    }    

    return new ListPatientDTO(data).getAll()
  }

  deletePatient(id: number): void {
    const patients: PatientType[] = []
    const patient: PatientType | undefined = patients.find(p => p.id === id)
  }
  
  listAllPatients(filter?: UpdatePatientType): PatientType[] {
    const patients: PatientType[] = []
    return patients
  }

  listPatientById(id: number): PatientType {
    let patient: PatientType = {} as PatientType
    return patient
  }
}