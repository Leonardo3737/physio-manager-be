// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto'

export const UpdateAppointmentSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  patient: true
}).partial()

export type UpdateAppointmentType = z.infer<typeof UpdateAppointmentSchema>

export class UpdateAppointmentDTO extends DTO<typeof UpdateAppointmentSchema> {
  protected rules() {
    return UpdateAppointmentSchema
  }
}
