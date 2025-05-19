import { z } from 'zod';
import { DTO } from '../dto';

export const AppointmentTypeFilterSchema = z.object({
  name: z.string(),
  page: z.coerce.number().int().min(1),
  perPage: z.coerce.number().int().min(1).max(100)
}).partial()

export type AppointmentTypeFilterType = z.infer<typeof AppointmentTypeFilterSchema>

export class AppointmentTypeFilterDTO extends DTO<typeof AppointmentTypeFilterSchema> {
  protected rules() {
    return AppointmentTypeFilterSchema
  }
}
