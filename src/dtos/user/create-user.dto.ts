import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUserType = z.infer<typeof CreateUserSchema>

export class CreateUserDTO extends DTO<typeof CreateUserSchema> {
  protected rules() {
    return CreateUserSchema
  }
}