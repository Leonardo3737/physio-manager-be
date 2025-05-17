import { z } from 'zod'
import { DTO } from '../dto'

export const ListAppointmentTypeSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  perPage: z.coerce.number().int().min(1).max(100).optional()
})

export type ListAppointmentTypeType = z.infer<typeof ListAppointmentTypeSchema>

export class ListAppointmentTypeDTO extends DTO<typeof ListAppointmentTypeSchema> {
  protected rules() {
    return ListAppointmentTypeSchema
  }
}
