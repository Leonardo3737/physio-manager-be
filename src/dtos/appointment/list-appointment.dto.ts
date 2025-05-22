import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto';
import { ResponseSchema } from '../response/response.schema';


export const ListAppointmentSchema = ResponseSchema(AppointmentSchema);

export type ListAppointmentType = z.infer<typeof ListAppointmentSchema>

export class ListAppointmentDTO extends DTO<typeof ListAppointmentSchema> {
  protected rules() {
    return ListAppointmentSchema
  }
}