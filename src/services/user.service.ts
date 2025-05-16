import { AppError } from "../config/errors/app.error"
import { CreateUserDTO } from "../dtos/user/create-user.dto"
import { ListUserDTO, ListUserType } from "../dtos/user/list-user.dto"
import { UserAuthDTO, UserAuthType } from "../dtos/user/user-auth.dto"
import { UserType } from "../dtos/user/user.schema"
import { UserRepository } from "../repositories/user.repository"
import { encryptPassword } from "../utils/encrypt"
import bcrypt from 'bcrypt'
import { genJWT } from "../utils/jwt"
import axios from "axios"
import { RequestResetPasswordDTO, ResetPasswordDTO } from "../dtos/user/reset-password"
import { PasswordResetTokenRepository } from "../repositories/password-reset-token.repository"
import crypto from 'crypto'

export class UserService {

  constructor(
    private repository: UserRepository,
    private passwordResetTokenRepository: PasswordResetTokenRepository,
  ) { }

  async registerUser(newUser: CreateUserDTO): Promise<ListUserType> {

    const user = newUser.getAll()

    const userWithSameEmail = await this.repository.listUser({ email: user.email })

    if (userWithSameEmail?.length) throw new AppError('There is already a user with this email', 409)

    const userWithSameRegister = await this.repository.listUser({ register: user.register })
    if (userWithSameRegister?.length) throw new AppError('There is already a user with this register', 409)

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

    const token = genJWT<UserType>({
      payload: user,
      expiresDay: 7
    })
    return token
  }

  async resetPassword(payload: ResetPasswordDTO) {
    const {
      password: newPassword,
      token,
      email
    } = payload.getAll()

    const listUser = await this.repository.listUser({ email })

    if (!listUser?.length)
      throw new AppError('user not found', 404)

    const user = listUser[0]

    const passwordResetToken = await this.passwordResetTokenRepository.listPasswordResetTokenByToken(token)

    if (!passwordResetToken)
      throw new AppError('invalid token', 401)

    if (new Date(passwordResetToken.expiresAt) < new Date())
      throw new AppError('token expired', 403)

    const newEncriptedPassword = await encryptPassword(newPassword)

    await this.repository.resetPassword(user.id, newEncriptedPassword)
    await this.passwordResetTokenRepository.deletePasswordResetToken(passwordResetToken.id)
  }


  async requestResetPassword(payload: RequestResetPasswordDTO) {
    const email = payload.get('email')

    const listUser = await this.repository.listUser({ email })

    if (!listUser?.length)
      throw new AppError('user not found', 404)

    const user = listUser[0]
    let token: string
    let tokenAlreadyUsed

    do {
      token = crypto.randomBytes(4).toString('hex')
      tokenAlreadyUsed = await this.passwordResetTokenRepository.listPasswordResetTokenByToken(token)
    } while (tokenAlreadyUsed)

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 2)

    const passwordResetToken = await this.passwordResetTokenRepository.createPasswordResetToken({
      token,
      userId: user.id,
      expiresAt
    })
    try {
      await this.sendResetPasswordEmail(email, token)
    } catch (err) {

      await this.passwordResetTokenRepository.deletePasswordResetToken(passwordResetToken.id)

      if (err instanceof AppError) {
        throw err
      }
      throw new AppError()
    }
  }

  private async sendResetPasswordEmail(email: string, token: string) {

    const url = 'https://api.brevo.com/v3/smtp/email'
    const body = {
      sender: {
        name: "physio-manager",
        email: "leovinicius3737@gmail.com",
      },
      to: [
        { name: email, email }
      ],
      subject: 'Recuperar senha',
      htmlContent: `
      <!DOCTYPE html> 
      <html> 
        <body> 
          <p>Token para recuperação de senha: <b>${token}</b></p> 
        </body>
      </html>
      `,
    }

    const headers = {
      'api-key': process.env.EMAIL_API_KEY
    }

    try {
      await axios.post(url, body, { headers })
      return
    }
    catch (err) {
      throw new AppError('fail', 500)
    }
  }
}