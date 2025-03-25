import { Application } from "express";
import { PatientController } from "../controllers/patient.controller";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientService } from "../services/patient.service";

export function controllersStartup(app: Application) {

  /* PATIENT */
  const patientRespository = new PatientRepository()
  const patientService = new PatientService(patientRespository)
  new PatientController(app, patientService)
  
}