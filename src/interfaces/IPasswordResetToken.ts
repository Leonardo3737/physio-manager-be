import { Optional } from 'sequelize';

export interface IPasswordResetToken {
  id: number
  userId: number
  token: string
  expiresAt: Date
  createdAt: Date
}

export interface ICreatePasswordResetToken extends Optional<IPasswordResetToken, 'id' | 'createdAt'> {}