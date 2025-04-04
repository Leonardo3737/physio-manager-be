import jwt from 'jsonwebtoken'
import { UserType } from '../dtos/user/user.schema'

export function genJWT(user: UserType) {
  const secret: string = process.env.JWT_SECRET || 'cade o segredo'

  const currentDate = new Date()
  const expiresDate = new Date()
  expiresDate.setDate(currentDate.getDate()+7)

  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    iat: currentDate.getTime(),
    exp: expiresDate.getTime()
  }

  return jwt.sign(payload, secret)
}