import { AppError } from "../config/errors/app.error"
import { CreateScheduleDTO } from '../dtos/schedule/create-schedule.dto'
import { UpdateScheduleDTO } from '../dtos/schedule/update-schedule.dto'
import { ListScheduleDTO } from '../dtos/schedule/list-schedule.dto'
import { ScheduleRepository } from '../repositories/schedule.repository'
import { ScheduleType } from "../dtos/schedule/schedule.schema"

export class ScheduleService {

  constructor(
    private repository: ScheduleRepository
  ) { }

  async registerSchedule(newSchedule: CreateScheduleDTO): Promise<ScheduleType> {
    return await this.repository.createSchedule(newSchedule.getAll())
  }

  async alterSchedule(id: number, newScheduleData: UpdateScheduleDTO): Promise<void> {
    const scheduleData = newScheduleData.getAll()

    // Checa se o agendamento existe antes de alterar
    await this.getScheduleById(id)

    await this.repository.alterSchedule(id, scheduleData)
  }

  async deleteSchedule(id: number): Promise<void> {
    await this.getScheduleById(id)
    await this.repository.deleteSchedule(id)
  }

  async listAllSchedules(filter?: ListScheduleDTO): Promise<ScheduleType[]> {
    return await this.repository.listAllSchedules(filter?.getAll())
  }

  async getScheduleById(id: number): Promise<ScheduleType> {
    const schedule = await this.repository.listScheduleById(id)

    if (!schedule) {
      throw new AppError('Schedule not found', 404)
    }

    return schedule
  }
}
