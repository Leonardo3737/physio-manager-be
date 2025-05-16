import { ScheduleStatus } from "../enum/schedule-status.enum";
import { PatientRepository } from "../repositories/patient.repository";
import { ScheduleRepository } from "../repositories/schedule.repository";
import { getTodayRange } from "../utils/getTodayRange";

export class DashboardService {

  constructor(
    private scheduleRepository: ScheduleRepository,
    private patientRepository: PatientRepository
  ) { }

  async getDashboard() {

    const rangeDate = getTodayRange()

    const todaySchedules = await this.scheduleRepository.listAllSchedules({
      status: ScheduleStatus.SCHEDULED
    })
    const totalPatients = await this.patientRepository.count()
    const totalSchedulesCompleted = await this.scheduleRepository.count({
      rangeDate,
      status: ScheduleStatus.COMPLETED
    })

    return {
      todaySchedules,
      totalPatients,
      totalSchedulesCompleted
    }
  }
}