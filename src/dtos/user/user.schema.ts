import { z } from "zod";
import { isValidCPF } from "../../utils/validate-cpf";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  register: z.string().refine(isValidCPF, {message: 'Invalid CPF.'}),
  password: z.string().min(6).max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserType = z.infer<typeof UserSchema>