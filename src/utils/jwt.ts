import jwt, { JwtPayload } from 'jsonwebtoken'
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


  const auxPayload: PayloadType = {
    sub: payload.id,
    name: payload.name,
    email: payload.email,
    iat: currentDate.getTime(),
    exp: expiresDate.getTime()
  }

  return jwt.sign(auxPayload, secret)
}

export function isJWTValid(token: string): PayloadType | null {
  const secret: string = process.env.JWT_SECRET || 'secret'

  try {
    const decoded = jwt.verify(token, secret)


    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'sub' in decoded &&
      'name' in decoded &&
      'email' in decoded &&
      'iat' in decoded &&
      'exp' in decoded
    ) {
      return decoded as unknown as PayloadType
    }

    return null

  } catch {
    return null
  }
}
