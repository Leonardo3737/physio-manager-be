import { z } from 'zod';
import { DTO } from '../dto';
import { AppointmentTypeSchema } from './appointment-type-schema';

export const FilterAppointmentTypeSchema = AppointmentTypeSchema.pick({
  name: true,
}).extend({
  page: z.coerce.number().int().min(1),
  perPage: z.coerce.number().int().min(1).max(100)
}).partial()

export type FilterAppointmentTypeType = z.infer<typeof FilterAppointmentTypeSchema>

export class FilterAppointmentTypeDTO extends DTO<typeof FilterAppointmentTypeSchema> {
  protected rules() {
    return FilterAppointmentTypeSchema
  }
}
