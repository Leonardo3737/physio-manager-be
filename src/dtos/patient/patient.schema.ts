import { z } from "zod";
import { DTO } from '../dto';
import { AppointmentSchema } from "../appointment/appointment.schema";

export const PatientSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100),
  email: z.string().email().optional(),
  phone: z.string().min(11).max(11),
  birthday: z.coerce.date().optional(),
  lastCompletedAppointment: z.lazy((() => AppointmentSchema) as ()=> z.AnyZodObject).optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PatientType = z.infer<typeof PatientSchema>

export class PatientDTO extends DTO<typeof PatientSchema> {
  protected rules() {
    return PatientSchema
  }
}