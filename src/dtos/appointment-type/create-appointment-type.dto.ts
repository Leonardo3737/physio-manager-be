import { z } from 'zod'
import { AppointmentTypeSchema } from './appointment-type-schema'
import { DTO } from '../dto'

export const CreateAppointmentTypeSchema = AppointmentTypeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export type CreateAppointmentTypeType = z.infer<typeof CreateAppointmentTypeSchema>

export class CreateAppointmentTypeDTO extends DTO<typeof CreateAppointmentTypeSchema> {
  protected rules() {
    return CreateAppointmentTypeSchema
  }
}
