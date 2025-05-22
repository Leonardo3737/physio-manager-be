import { z } from 'zod'
import { AppointmentSchema } from './appointment.schema'
import { DTO } from '../dto';


export const GetAppointmentSchema = AppointmentSchema.extend({
  initialDiscomfort: AppointmentSchema.shape.initialDiscomfort.nullable(),
  finalDiscomfort: AppointmentSchema.shape.finalDiscomfort.nullable(),
});

export type GetAppointmentType = z.infer<typeof GetAppointmentSchema>

export class GetAppointmentDTO extends DTO<typeof GetAppointmentSchema> {
  protected rules() {
      return GetAppointmentSchema
    }
}