// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto'

export const ConcludeAppointmentSchema = AppointmentSchema.pick({
  finalDiscomfort: true,
  notes: true,
}).extend({
  initialDiscomfort: AppointmentSchema.shape.initialDiscomfort.optional()
})

export type ConcludeAppointmentType = z.infer<typeof ConcludeAppointmentSchema>

export class ConcludeAppointmentDTO extends DTO<typeof ConcludeAppointmentSchema> {
  protected rules() {
    return ConcludeAppointmentSchema
  }
}
