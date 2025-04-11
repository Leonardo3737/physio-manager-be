import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";

export const UserAuthSchema = UserSchema.pick({
  register: true,
  password: true
})

export type UserAuthType = z.infer<typeof UserAuthSchema>

export class UserAuthDTO extends DTO<typeof UserAuthSchema> {
  protected rules() {
    return UserAuthSchema
  }
}