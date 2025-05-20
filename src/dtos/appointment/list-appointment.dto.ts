import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto';


export const ListAppointmentSchema = AppointmentSchema.extend({
  initialDiscomfort: AppointmentSchema.shape.initialDiscomfort.nullable(),
  finalDiscomfort: AppointmentSchema.shape.finalDiscomfort.nullable(),
});

export type ListAppointmentType = z.infer<typeof ListAppointmentSchema>

export class ListAppointmentDTO extends DTO<typeof ListAppointmentSchema> {
  protected rules() {
      return ListAppointmentSchema
    }
}