import { AppointmentStatus } from "../enum/appointment-status.enum";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { getCurrentWeekRange } from "../utils/get-date-range";

export class DashboardService {

  constructor(
    private appointmentRepository: AppointmentRepository,
    private patientRepository: PatientRepository
  ) { }

  async getDashboard() {

    const rangeDate = getCurrentWeekRange()

    const todayAppointments = await this.appointmentRepository.listAllAppointments({
      status: AppointmentStatus.SCHEDULED
    })
    const totalPatients = await this.patientRepository.count()
    const totalAppointmentsCompleted = await this.appointmentRepository.count({
      rangeDate,
      status: AppointmentStatus.COMPLETED
    })

    return {
      todayAppointments,
      totalPatients,
      totalAppointmentsCompleted
    }
  }
}