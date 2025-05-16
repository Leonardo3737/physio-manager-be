import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserType } from '../dtos/user/user.schema'

export type PayloadType = {
  sub: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}


export function genJWT(user: UserType) {
  const secret: string = process.env.JWT_SECRET || 'secret'

  const currentDate = new Date()
  const expiresDate = new Date()
  expiresDate.setDate(currentDate.getDate() + 7)

  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    iat: currentDate.getTime(),
    exp: expiresDate.getTime()
  }

  return jwt.sign(payload, secret)
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
