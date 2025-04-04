import { CreateUserType } from "../dtos/user/create-user.dto";
import { ListUserDTO, ListUserType } from "../dtos/user/list-user.dto";
import { UserAuthType } from "../dtos/user/user-auth.dto";
import { UserType } from "../dtos/user/user.schema";
import User from "../models/user.model";

export class UserRepository {

  async createUser(newUser: CreateUserType): Promise<ListUserType> {
    const process = await User.create(newUser)

    const userCreated = new ListUserDTO({ ...process.dataValues }).getAll()

    return userCreated
  }

  async deleteUser(id: number): Promise<void> {
    await User.destroy({ where: { id } })
  }

  async listUserById(id: number): Promise<UserType | null> {
    const user = await User.findByPk(id)
    return user
  }

  async listUserByRegister(register: string): Promise<UserType | null> {
    const user = await User.findOne({
      where: {
        register
      }
    })
    return user
  }

}