import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";

export const ListUserSchema = UserSchema.omit({
  password: true
})

export type ListUserType = z.infer<typeof ListUserSchema>

export class ListUserDTO extends DTO<typeof ListUserSchema> {
  protected rules() {
    return ListUserSchema
  }
}