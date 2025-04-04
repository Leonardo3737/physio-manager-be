import { Application } from "express";
import { PatientController } from "../controllers/patient.controller";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientService } from "../services/patient.service";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

export function controllersStartup(app: Application) {

  /* PATIENT */
  const patientRespository = new PatientRepository()
  const patientService = new PatientService(patientRespository)
  new PatientController(app, patientService)
  
  /* PATIENT */
  const userRespository = new UserRepository()
  const userService = new UserService(userRespository)
  new UserController(app, userService)
  
}