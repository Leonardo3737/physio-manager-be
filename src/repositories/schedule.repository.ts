import { Op, WhereOptions } from 'sequelize'
import { CreateScheduleType } from '../dtos/schedule/create-schedule.dto'
import { ListScheduleDTO, ListScheduleType } from '../dtos/schedule/list-schedule.dto'
import { ScheduleFilterType } from '../dtos/schedule/schedule-filter.dto'
import { ScheduleType } from '../dtos/schedule/schedule.schema'
import { UpdateScheduleType } from '../dtos/schedule/update-schedule.dto'
import { ScheduleStatus } from '../enum/schedule-status.enum'
import AppointmentType from '../models/appointment-type.model'
import Patient from '../models/patient.model'
import { default as Schedule, default as ScheduleModel } from '../models/schedule.model'

interface ICountFilter {
  rangeDate?: {
    start: Date,
    end: Date
  },
  status: ScheduleStatus
}

export class ScheduleRepository {
  async alterSchedule(id: number, newScheduleData: UpdateScheduleType): Promise<void> {
    await ScheduleModel.update({ ...newScheduleData }, { where: { id } })
  }

  async createSchedule(newSchedule: CreateScheduleType): Promise<ListScheduleType> {
    const process = await ScheduleModel.create(newSchedule)
    const created = new ListScheduleDTO({ ...process.dataValues }).getAll()
    return created
  }

  async deleteSchedule(id: number): Promise<void> {
    await ScheduleModel.destroy({ where: { id } })
  }

  async listAllSchedules(filter?: ScheduleFilterType): Promise<ScheduleType[]> {
    const validFilter = Object.fromEntries(
      Object.entries(filter || {}).filter(([ _, v ]) => v !== undefined)
    )

    const validKeys = Object.keys(Schedule.getAttributes());
    const where: WhereOptions<Schedule> = {}

    Object.keys(validFilter).map(key => {
      if (validKeys.includes(key)) {
        where[ key as keyof WhereOptions<Schedule> ] = validFilter[ key ]
      }
    })

    if (
      validFilter.initialDate instanceof Date &&
      validFilter.finalDate instanceof Date
    ) {
      where.date = {
        [ Op.between ]: [ validFilter.initialDate, validFilter.finalDate ],
      }
    }


    const schedules = await ScheduleModel.findAll({
      where,
      include: [
        {
          model: Patient,
          as: 'patient'
        },
        {
          model: AppointmentType,
          as: 'appointmentType'
        },
      ],
      order: [ [ 'date', 'ASC' ] ],
    },
    )
    return schedules
  }

  async listScheduleById(id: number): Promise<ScheduleType | null> {
    const schedule = await ScheduleModel.findByPk(id)
    return schedule
  }

  async checkConflictingAppointment(patientId: number, appointmentDate: Date): Promise<boolean> {
    const conflictingAppointment = await Schedule.findOne({
      where: {
        patientId: patientId,
        date: appointmentDate,
      }
    });
    return !!conflictingAppointment;
  }

  async count(filter?: ICountFilter): Promise<number> {

    const where: WhereOptions<Schedule> = {}

    if (
      filter?.rangeDate?.end instanceof Date &&
      filter?.rangeDate?.start instanceof Date
    ) {
      where.date = {
        [ Op.between ]: [ filter.rangeDate.start, filter.rangeDate.end ],
      }
    }

    if (filter?.status) {
      where.status = filter.status
    }

    const total = await ScheduleModel.count({ where })

    return total
  }
}