import { AppError } from "../config/errors/app.error"
import { CreateAppointmentDTO } from '../dtos/appointment/create-appointment.dto'
import { UpdateAppointmentDTO, UpdateAppointmentType } from '../dtos/appointment/update-appointment.dto'
import { ListAppointmentType } from '../dtos/appointment/list-appointment.dto'
import { AppointmentRepository } from '../repositories/appointment.repository'
import { AppointmentType } from "../dtos/appointment/appointment.schema"
import { AppointmentStatus } from "../enum/appointment-status.enum"
import { AppointmentFilterDTO } from "../dtos/appointment/appointment-filter.dto"
import { StartAppointmentDTO } from "../dtos/appointment/start-appointment.dto"
import { ConcludeAppointmentDTO } from "../dtos/appointment/conclude-appointment.dto"
import { GetAppointmentType } from "../dtos/appointment/get-appointment.dto"

export class AppointmentService {

  constructor(
    private repository: AppointmentRepository
  ) { }

  async listAllAppointments(filter?: AppointmentFilterDTO): Promise<ListAppointmentType> {
    return await this.repository.listAllAppointments(filter?.getAll())
  }

  async getAppointmentById(id: number): Promise<AppointmentType> {
    const appointment = await this.repository.listAppointmentById(id)

    if (!appointment) {
      throw new AppError('Appointment not found', 404)
    }

    return appointment
  }


  async registerAppointment(newAppointment: CreateAppointmentDTO, force: boolean): Promise<GetAppointmentType> {
    const appointment = { ...newAppointment.getAll() }
    appointment.status = AppointmentStatus.SCHEDULED

    await this.checkDateAvailability(appointment.date, force)

    return await this.repository.createAppointment(appointment)
  }


  async alterAppointment(appointmentId: number, newAppointmentData: UpdateAppointmentDTO, force: boolean): Promise<void> {
    const appointmentData = newAppointmentData.getAll()

    // Checa se o agendamento existe antes de alterar
    const appointment = await this.getAppointmentById(appointmentId)

    if (appointmentData.date) {
      await this.checkDateAvailability(appointmentData.date, force, appointmentId)
    }

    if (!this.isNumber(appointment.initialDiscomfort) && this.isNumber(appointmentData.finalDiscomfort)) throw new AppError('cannot update final discomfort value if initial discomfort is null', 400)

    await this.repository.alterAppointment(appointmentId, appointmentData)
  }

  async cancelAppointment(id: number) {
    const appointment = await this.getAppointmentById(id)
    if (appointment.status === AppointmentStatus.COMPLETED) throw new AppError('cannot cancel a appointment that has already been completed.', 400)

    await this.repository.alterAppointment(id, { status: AppointmentStatus.CANCELED })
  }

  async activeAppointment(id: number) {
    const appointment = await this.getAppointmentById(id)
    if (appointment.status === AppointmentStatus.COMPLETED) throw new AppError('cannot active a appointment that is not canceled.', 400)

    await this.repository.alterAppointment(id, { status: AppointmentStatus.SCHEDULED })
  }

  async startAppointment(id: number, newAppointmentData: StartAppointmentDTO) {
    const appointment = await this.getAppointmentById(id)
    if (appointment.status !== AppointmentStatus.SCHEDULED) throw new AppError('cannot start a appointment whose status is not SCHEDULED.', 400)

    await this.repository.alterAppointment(id, newAppointmentData.getAll())
  }

  async concludeAppointment(id: number, newAppointmentData: ConcludeAppointmentDTO) {
    const appointment = await this.getAppointmentById(id)

    if (appointment.status !== AppointmentStatus.SCHEDULED) throw new AppError('cannot conclude a appointment whose status is not SCHEDULED.', 400)

    if (!this.isNumber(appointment.initialDiscomfort)) throw new AppError('It is not possible to complete a program whose initial discomfort has not been defined', 400)

    const updateData: UpdateAppointmentType = {
      ...newAppointmentData.getAll(),
      status: AppointmentStatus.COMPLETED
    }

    await this.repository.alterAppointment(id, updateData)
  }

  async deleteAppointment(id: number): Promise<void> {
    await this.getAppointmentById(id)
    await this.repository.deleteAppointment({id})
  }

  async deleteAppointmentsByPatient(patientId: number): Promise<void> {
    await this.repository.deleteAppointment({patientId})
  }


  // ----------> UTILS <----------

  private isNumber(value: unknown) {
    return typeof value === 'number'
  }

  private async checkDateAvailability(date: Date, force: boolean, appointmentId?: number) {
    const initialDate = new Date(date)
    initialDate.setHours(initialDate.getHours() - 1)

    const finalDate = new Date(date)
    finalDate.setHours(finalDate.getHours() + 1)

    const appointments = await this.repository.listAllAppointments({ initialDate, finalDate, perPage: 100, status: AppointmentStatus.SCHEDULED })

    const isOtherAppointment = appointments.data.find(s => s.id !== appointmentId)

    const existAppointmentAtSameDate = appointments.data.find(s =>
      s.date.getTime() === date.getTime() &&
      s.id !== appointmentId
    )

    if (existAppointmentAtSameDate)
      throw new AppError('There is already a registered appointment for this time', 409, 'EXACT_CONFLICT')

    if (appointments.data.length && !force && isOtherAppointment)
      throw new AppError('There is already a appointment close to the defined date and time, to create it anyway send the "force" flag', 409, 'NEARBY_CONFLICT')

  }
}
