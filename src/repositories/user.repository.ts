import { AppError } from "../config/errors/app.error";
import { CreateUserType } from "../dtos/user/create-user.dto";
import { ListUserDTO, ListUserType } from "../dtos/user/list-user.dto";
import { UpdateUserType } from "../dtos/user/update-user.dto";
import { UserAuthType } from "../dtos/user/user-auth.dto";
import { UserType } from "../dtos/user/user.schema";
import User from "../models/user.model";

export class UserRepository {

  async alterUser(userId: number, newUserData: UpdateUserType): Promise<void> {
    await User.update({ ...newUserData }, { where: { id: userId } })
  }

  async createUser(newUser: CreateUserType): Promise<ListUserType> {
    try {
      const process = await User.create(newUser)

      const userCreated = new ListUserDTO({ ...process.dataValues }).getAll()
      return userCreated
    }
    catch (err) {
      console.error('Erro ao criar usuario:', err);
      throw new AppError();
    }

  }

  // DEVE SER CHAMDA APENAS EM UserService.resetPassword
  async resetPassword(id: number, password: string): Promise<void> {
    await User.update({ password }, { where: { id } })
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

  async listUser(filter: Partial<UserType>): Promise<UserType[] | null> {
    const user = await User.findAll({
      where: {
        ...filter
      }
    })
    return user
  }

}