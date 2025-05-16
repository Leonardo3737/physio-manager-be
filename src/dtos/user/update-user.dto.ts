import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type UpdateUserType = z.infer<typeof UpdateUserSchema>

export class UpdateUserDTO extends DTO<typeof UpdateUserSchema> {
  protected rules() {
    return UpdateUserSchema
  }
}