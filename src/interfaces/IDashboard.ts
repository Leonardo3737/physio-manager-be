import { AppointmentType } from "../dtos/appointment/appointment.schema"

export interface IDashboard {
  totalPatients: number
  totalAppointmentsCompleted: number
  todayAppointments: AppointmentType[]
}