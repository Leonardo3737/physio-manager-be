// update-appointment.dto.ts
import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto'

export const AppointmentFilterSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  initialDate: z.coerce.date(),
  finalDate: z.coerce.date(),
}).partial()

export type AppointmentFilterType = z.infer<typeof AppointmentFilterSchema>

export class AppointmentFilterDTO extends DTO<typeof AppointmentFilterSchema> {
  protected rules() {
    return AppointmentFilterSchema
  }
}
