import { Application } from "express";
import { PatientController } from "../controllers/patient.controller";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientService } from "../services/patient.service";

import { ScheduleRepository } from "../repositories/schedule.repository";
import { ScheduleService } from "../services/schedule.service";
import { ScheduleController } from "../controllers/schedule.controller";

import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";


export function controllersStartup(app: Application) {

  /* PATIENT */
  const patientRespository = new PatientRepository()
  const patientService = new PatientService(patientRespository)
  new PatientController(app, patientService)
  
  /* SCHEDULE */
  const scheduleRespository = new ScheduleRepository()
  const scheduleService = new ScheduleService(scheduleRespository)
  new ScheduleController(app, scheduleService)

  /* USER */
  const userRespository = new UserRepository()
  const userService = new UserService(userRespository)
  new UserController(app, userService)

}