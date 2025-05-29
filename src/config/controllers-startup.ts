import { Application } from "express";
import { PatientController } from "../controllers/patient.controller";
import { PatientRepository } from "../repositories/patient.repository";
import { PatientService } from "../services/patient.service";

import { AppointmentController } from "../controllers/appointment.controller";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { AppointmentService } from "../services/appointment.service";

import { AppointmentTypeController } from '../controllers/appointment-type.controller';
import { DashboardController } from "../controllers/dashboard.controller";
import { UserController } from "../controllers/user.controller";
import { AppointmentTypeRepository } from '../repositories/appointment-type.repository';
import { PasswordResetTokenRepository } from "../repositories/password-reset-token.repository";
import { UserRepository } from "../repositories/user.repository";
import { AppointmentTypeService } from '../services/appointment-type.service';
import { DashboardService } from "../services/dashboard.service";
import { UserService } from "../services/user.service";


export function controllersStartup(app: Application) {

  /* PASSWORD-RESET-TOKEN */
  const passwordResetTokenRepository = new PasswordResetTokenRepository()
  
  /* APPOINTMENT-TYPE */
  const appointmentTypeRespository = new AppointmentTypeRepository()
  const appointmentTypeService = new AppointmentTypeService(appointmentTypeRespository)
  new AppointmentTypeController(app, appointmentTypeService)

  /* APPOINTMENT */
  const appointmentRespository = new AppointmentRepository()
  const appointmentService = new AppointmentService(appointmentRespository)
  new AppointmentController(app, appointmentService)

  /* PATIENT */
  const patientRespository = new PatientRepository()
  const patientService = new PatientService(patientRespository, appointmentService)
  new PatientController(app, patientService)

  /* USER */
  const userRespository = new UserRepository()
  const userService = new UserService(userRespository, passwordResetTokenRepository)
  new UserController(app, userService)

  /* DASHBOARD */
  const dashboardService = new DashboardService(appointmentRespository, patientRespository)
  new DashboardController(app, dashboardService)


}