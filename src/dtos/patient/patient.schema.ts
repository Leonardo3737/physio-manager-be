import { z } from "zod";
import { DTO } from '../dto';

export const PatientSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  age: z.number().min(0).max(150),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type PatientType = z.infer<typeof PatientSchema>

export class PatientDTO extends DTO<typeof PatientSchema> {
  protected rules() {
    return PatientSchema
  }
}