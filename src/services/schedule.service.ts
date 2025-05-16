import { AppError } from "../config/errors/app.error"
import { CreateScheduleDTO } from '../dtos/schedule/create-schedule.dto'
import { UpdateScheduleDTO, UpdateScheduleType } from '../dtos/schedule/update-schedule.dto'
import { ListScheduleType } from '../dtos/schedule/list-schedule.dto'
import { ScheduleRepository } from '../repositories/schedule.repository'
import { ScheduleType } from "../dtos/schedule/schedule.schema"
import { ScheduleStatus } from "../enum/schedule-status.enum"
import { ScheduleFilterDTO } from "../dtos/schedule/schedule-filter.dto"
import { StartScheduleDTO } from "../dtos/schedule/start-schedule.dto"
import { ConcludeScheduleDTO } from "../dtos/schedule/conclude-schedule.dto"

export class ScheduleService {

  constructor(
    private repository: ScheduleRepository
  ) { }

  async listAllSchedules(filter?: ScheduleFilterDTO): Promise<ScheduleType[]> {
    return await this.repository.listAllSchedules(filter?.getAll())
  }

  async getScheduleById(id: number): Promise<ScheduleType> {
    const schedule = await this.repository.listScheduleById(id)

    if (!schedule) {
      throw new AppError('Schedule not found', 404)
    }

    return schedule
  }


  async registerSchedule(newSchedule: CreateScheduleDTO, force: boolean): Promise<ListScheduleType> {
    const schedule = { ...newSchedule.getAll() }
    schedule.status = ScheduleStatus.SCHEDULED

    await this.checkDateAvailability(schedule.date, force)

    return await this.repository.createSchedule(schedule)
  }


  async alterSchedule(scheduleId: number, newScheduleData: UpdateScheduleDTO, force: boolean): Promise<void> {
    const scheduleData = newScheduleData.getAll()

    // Checa se o agendamento existe antes de alterar
    const schedule = await this.getScheduleById(scheduleId)

    if (scheduleData.date) {
      await this.checkDateAvailability(scheduleData.date, force, scheduleId)
    }

    if (!this.isNumber(schedule.initialDiscomfort) && this.isNumber(scheduleData.finalDiscomfort)) throw new AppError('cannot update final discomfort value if initial discomfort is null', 400)

    await this.repository.alterSchedule(scheduleId, scheduleData)
  }

  async cancelSchedule(id: number) {
    const schedule = await this.getScheduleById(id)
    if (schedule.status === ScheduleStatus.COMPLETED) throw new AppError('cannot cancel a schedule that has already been completed.', 400)

    await this.repository.alterSchedule(id, { status: ScheduleStatus.CANCELED })
  }

  async activeSchedule(id: number) {
    const schedule = await this.getScheduleById(id)
    if (schedule.status === ScheduleStatus.COMPLETED) throw new AppError('cannot active a schedule that is not canceled.', 400)

    await this.repository.alterSchedule(id, { status: ScheduleStatus.SCHEDULED })
  }

  async startSchedule(id: number, newScheduleData: StartScheduleDTO) {
    const schedule = await this.getScheduleById(id)
    if (schedule.status !== ScheduleStatus.SCHEDULED) throw new AppError('cannot start a schedule whose status is not SCHEDULED.', 400)

    await this.repository.alterSchedule(id, newScheduleData.getAll())
  }

  async concludeSchedule(id: number, newScheduleData: ConcludeScheduleDTO) {
    const schedule = await this.getScheduleById(id)

    if (schedule.status !== ScheduleStatus.SCHEDULED) throw new AppError('cannot conclude a schedule whose status is not SCHEDULED.', 400)

    if (!this.isNumber(schedule.initialDiscomfort)) throw new AppError('It is not possible to complete a program whose initial discomfort has not been defined', 400)

    const updateData: UpdateScheduleType = {
      ...newScheduleData.getAll(),
      status: ScheduleStatus.COMPLETED
    }

    await this.repository.alterSchedule(id, updateData)
  }


  async deleteSchedule(id: number): Promise<void> {
    await this.getScheduleById(id)
    await this.repository.deleteSchedule(id)
  }


  // ----------> UTILS <----------

  private isNumber(value: unknown) {
    return typeof value === 'number'
  }

  private async checkDateAvailability(date: Date, force: boolean, scheduleId?: number) {
    const initialDate = new Date(date)
    initialDate.setHours(initialDate.getHours() - 1)

    const finalDate = new Date(date)
    finalDate.setHours(finalDate.getHours() + 1)

    const schedules = await this.repository.listAllSchedules({ initialDate, finalDate })

    const isOtherSchedule = schedules.find(s => s.id !== scheduleId)

    const existScheduleAtSameDate = schedules.find(s =>
      s.date.getTime() === date.getTime() &&
      s.id !== scheduleId
    )

    if (existScheduleAtSameDate)
      throw new AppError('There is already a registered schedule for this time', 409, 'EXACT_CONFLICT')

    if (schedules.length && !force && isOtherSchedule)
      throw new AppError('There is already a schedule close to the defined date and time, to create it anyway send the "force" flag', 409, 'NEARBY_CONFLICT')

  }
}
