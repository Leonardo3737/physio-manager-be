import { z } from "zod";

export const PatientSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phone: z.string(),
  age: z.number().min(0).max(150)
})

export type PatientType = z.infer<typeof PatientSchema>