import { z } from 'zod';
import { DTO } from '../dto';
import { AppointmentSchema } from './appointment.schema';

export const CreateAppointmentSchema = AppointmentSchema.omit({
  id: true,
  createdAt: true,
  initialDiscomfort: true,
  finalDiscomfort: true,
  updatedAt: true,
}).extend({
  status: AppointmentSchema.shape.status.optional(),
  initialDiscomfort: AppointmentSchema.shape.initialDiscomfort.optional().nullable(),
  finalDiscomfort: AppointmentSchema.shape.finalDiscomfort.optional().nullable()
});

export type CreateAppointmentType = z.infer<typeof CreateAppointmentSchema>

export class CreateAppointmentDTO extends DTO<typeof CreateAppointmentSchema> {
  protected rules() {
    return CreateAppointmentSchema
  }
}
