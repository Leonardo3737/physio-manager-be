import jwt from 'jsonwebtoken'
import { UserType } from '../dtos/user/user.schema'

export type PayloadType = {
  sub: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}


export function genJWT({
  payload,
  expiresDay = 0,
  expiresHour = 0,
  expiresMinute = 0,
}: {
  payload: UserType,
  expiresDay?: number,
  expiresHour?: number,
  expiresMinute?: number,
}) {
  const secret: string = process.env.JWT_SECRET || 'secret'

  const currentDate = new Date()
  const expiresDate = new Date()
  expiresDate.setDate(currentDate.getDate() + expiresDay)
  expiresDate.setHours(currentDate.getHours() + expiresHour)
  expiresDate.setMinutes(currentDate.getMinutes() + expiresMinute)


  const auxPayload = {
    sub: payload.id,
    name: payload.name,
    email: payload.email,
    iat: currentDate.getTime(),
    exp: expiresDate.getTime()
  }

  return jwt.sign(auxPayload, secret)
}

export function isJWTValid(token: string): string | jwt.JwtPayload | null {
  const secret: string = process.env.JWT_SECRET || 'secret'

  try {
    const decoded = jwt.verify(token, secret)


    return decoded

  } catch {
    return null
  }
}
