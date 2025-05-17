import { z } from 'zod';
import { DTO } from '../dto';
import { CreateAppointmentTypeSchema } from './create-appointment-type.dto';

export const UpdateAppointmentTypeSchema = CreateAppointmentTypeSchema.partial();

export type UpdateAppointmentTypeType = z.infer<typeof UpdateAppointmentTypeSchema>;

export class UpdateAppointmentTypeDTO extends DTO<typeof UpdateAppointmentTypeSchema> {
  protected rules() {
    return UpdateAppointmentTypeSchema;
  }
}
