import { z } from 'zod';
import { DTO } from '../dto';
import { UpdatePatientSchema } from './update-patient.dto';

export const FilterPatientSchema = UpdatePatientSchema.extend({
  page: z.coerce.number().int().default(1),
  perPage: z.coerce.number().int().default(10),
  search: z.string(),
}).partial();

export type FilterPatientType = z.infer<typeof FilterPatientSchema>;

export class FilterPatientDTO extends DTO<typeof FilterPatientSchema> {
  protected rules() {
    return FilterPatientSchema
  }
}