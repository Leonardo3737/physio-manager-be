// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto'

export const StartAppointmentSchema = AppointmentSchema.pick({
  initialDiscomfort: true,
  notes: true,
})

export type StartAppointmentType = z.infer<typeof StartAppointmentSchema>

export class StartAppointmentDTO extends DTO<typeof StartAppointmentSchema> {
  protected rules() {
    return StartAppointmentSchema
  }
}
