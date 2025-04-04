import { AppError } from "../config/errors/app.error"
import { CreateUserDTO, CreateUserType } from "../dtos/user/create-user.dto"
import { ListUserDTO, ListUserType } from "../dtos/user/list-user.dto"
import { UserAuthDTO, UserAuthType } from "../dtos/user/user-auth.dto"
import { UserType } from "../dtos/user/user.schema"
import { UserRepository } from "../repositories/user.repository"
import { encryptPassword } from "../utils/encrypt"
import bcrypt from 'bcrypt'
import { genJWT } from "../utils/jwt"

export class UserService {

  constructor(
    private repository: UserRepository
  ) { }

  async registerUser(newUser: CreateUserDTO): Promise<ListUserType> {

    const user = newUser.getAll()
    user.password = await encryptPassword(user.password)

    return await this.repository.createUser(user)
  }

  async deleteUser(id: number): Promise<void> {
    await this.listUserById(id)
    await this.repository.deleteUser(id)
  }

  async listUserById(id: number): Promise<ListUserType> {
    const user = await this.repository.listUserById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithouPassword = new ListUserDTO(user)

    return userWithouPassword.getAll()
  }

  async userAuth(auth: UserAuthDTO): Promise<string> {
    const user = await this.repository.listUserByRegister(auth.get('register'))

    if (!user) {
      throw new AppError('user not found', 404)
    }

    const isAuth = bcrypt.compareSync(auth.get('password'), user.password)

    if (!isAuth) {
      throw new AppError('unauthorized', 401)
    }

    const token = genJWT(user)
    return token
  }
}