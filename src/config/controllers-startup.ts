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
import { DashboardService } from "../services/dashboard.service";
import { DashboardController } from "../controllers/dashboard.controller";
import { PasswordResetTokenRepository } from "../repositories/password-reset-token.repository";


export function controllersStartup(app: Application) {

  /* PASSWORD-RESET-TOKEN */
  const passwordResetTokenRepository = new PasswordResetTokenRepository()

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
  const userService = new UserService(userRespository, passwordResetTokenRepository)
  new UserController(app, userService)

  /* DASHBOARD */
  const dashboardService = new DashboardService(scheduleRespository, patientRespository)
  new DashboardController(app, dashboardService)

}