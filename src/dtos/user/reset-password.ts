import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";

export const RequestResetPasswordSchema = UserSchema.pick({
  email: true
})

export type RequestResetPasswordType = z.infer<typeof RequestResetPasswordSchema>

export class RequestResetPasswordDTO extends DTO<typeof RequestResetPasswordSchema> {
  protected rules() {
    return RequestResetPasswordSchema
  }
}

export const ResetPasswordSchema = UserSchema.pick({
  email: true,
  password: true
}).extend({
  token: z.string().length(8)
})

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>

export class ResetPasswordDTO extends DTO<typeof ResetPasswordSchema> {
  protected rules() {
    return ResetPasswordSchema
  }
}