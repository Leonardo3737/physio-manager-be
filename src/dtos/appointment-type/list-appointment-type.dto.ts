import { z } from 'zod'
import { DTO } from '../dto'
import { ResponseSchema } from '../response/response.schema'
import { AppointmentTypeSchema } from './appointment-type-schema'

export const ListAppointmentTypeSchema = ResponseSchema(AppointmentTypeSchema)

export type ListAppointmentTypeType = z.infer<typeof ListAppointmentTypeSchema>

export class ListAppointmentTypeDTO extends DTO<typeof ListAppointmentTypeSchema> {
  protected rules() {
    return ListAppointmentTypeSchema
  }
}
