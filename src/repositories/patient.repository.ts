import { CreatePatientType } from "../dtos/patient/create-patient.dto";
import { ListPatientDTO } from "../dtos/patient/list-patient.dto";
import { PatientType } from "../dtos/patient/patient.schema";
import { UpdatePatientType } from "../dtos/patient/update-patient.dto";
import Patient from "../models/patient.model";

export class PatientRepository {

  async alterPatient(id: number, newPatientData: UpdatePatientType): Promise<void> {
    await Patient.update({...newPatientData}, {where: {id}})
  }

  async createPatient(newPatient: CreatePatientType): Promise<PatientType> {

    const process = await Patient.create(newPatient)
    console.log(process.age);
    
    const patientCreated = new ListPatientDTO({...process.dataValues}).getAll()

    return patientCreated
  }

  async deletePatient(id: number): Promise<void> {
    await Patient.destroy({where: { id }})
  }
  
  async listAllPatients(filter?: UpdatePatientType): Promise<PatientType[]> {
    const patients = await Patient.findAll({where: {...filter}})
    return patients
  }

  async listPatientById(id: number): Promise<PatientType | null> {
    const patient = await Patient.findByPk(id)
    return patient
  }
}