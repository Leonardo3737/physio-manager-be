import { ScheduleType } from "../dtos/schedule/schedule.schema"

export interface IDashboard {
  totalPatients: number
  totalSchedulesCompleted: number
  todaySchedules: ScheduleType[]
}