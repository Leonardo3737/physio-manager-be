import { Op, WhereOptions } from 'sequelize'
import { CreateAppointmentType } from '../dtos/appointment/create-appointment.dto'
import { ListAppointmentType } from '../dtos/appointment/list-appointment.dto'
import { AppointmentFilterType } from '../dtos/appointment/appointment-filter.dto'
import { UpdateAppointmentType } from '../dtos/appointment/update-appointment.dto'
import { AppointmentStatus } from '../enum/appointment-status.enum'
import Patient from '../models/patient.model'
import Appointment from '../models/appointment.model'
import { AppointmentType } from '../dtos/appointment/appointment.schema'
import AppointmentTypeModel from '../models/appointment-type.model'
import { CreatePaginatedResponse } from '../utils/create-paginated-response'
import { GetAppointmentDTO, GetAppointmentType } from '../dtos/appointment/get-appointment.dto'

type AtLeastOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>
}[keyof T]

interface ICountFilter {
  rangeDate?: {
    start: Date,
    end: Date
  },
  status: AppointmentStatus
}

export class AppointmentRepository {
  async alterAppointment(id: number, newAppointmentData: UpdateAppointmentType): Promise<void> {
    await Appointment.update({ ...newAppointmentData }, { where: { id } })
  }

  async createAppointment(newAppointment: CreateAppointmentType): Promise<GetAppointmentType> {
    const process = await Appointment.create(newAppointment)
    const created = new GetAppointmentDTO({ ...process.dataValues }).getAll()
    return created
  }

  async deleteAppointment(filter: AtLeastOne<AppointmentType>): Promise<void> {
    await Appointment.destroy({ where: { ...filter } })
  }

  async listAllAppointments(filter?: AppointmentFilterType): Promise<ListAppointmentType> {
    const validFilter = Object.fromEntries(
      Object.entries(filter || {}).filter(([_, v]) => v !== undefined)
    )

    const validKeys = Object.keys(Appointment.getAttributes());
    const where: WhereOptions<Appointment> = {}

    Object.keys(validFilter).map(key => {
      if (validKeys.includes(key)) {
        where[key as keyof WhereOptions<Appointment>] = validFilter[key]
      }
    })

    if (
      validFilter.initialDate instanceof Date &&
      validFilter.finalDate instanceof Date
    ) {
      where.date = {
        [Op.between]: [validFilter.initialDate, validFilter.finalDate],
      }
    }

    const { page = 1, perPage = 10 } = filter || {}

    const offset = (page - 1) * perPage
    const limit = perPage


    const result = await Appointment.findAndCountAll({
      where,
      include: [
        {
          model: Patient,
          as: 'patient'
        },
        {
          model: AppointmentTypeModel,
          as: 'appointmentType'
        },
      ],
      order: [['date', 'ASC']],
      limit,
      offset,
    })

    return CreatePaginatedResponse({result, page, perPage})
  }

  async listAppointmentById(id: number): Promise<AppointmentType | null> {
    const appointment = await Appointment.findByPk(
      id,
      {
        include: [
          {
            model: Patient,
            as: 'patient'
          },
          {
            model: AppointmentTypeModel,
            as: 'appointmentType'
          },
        ],
      })
    return appointment
  }

  async checkConflictingAppointment(patientId: number, appointmentDate: Date): Promise<boolean> {
    const conflictingAppointment = await Appointment.findOne({
      where: {
        patientId: patientId,
        date: appointmentDate,
      }
    });
    return !!conflictingAppointment;
  }

  async count(filter?: ICountFilter): Promise<number> {

    const where: WhereOptions<Appointment> = {}

    if (
      filter?.rangeDate?.end instanceof Date &&
      filter?.rangeDate?.start instanceof Date
    ) {
      where.date = {
        [Op.between]: [filter.rangeDate.start, filter.rangeDate.end],
      }
    }

    if (filter?.status) {
      where.status = filter.status
    }

    const total = await Appointment.count({ where })

    return total
  }
}