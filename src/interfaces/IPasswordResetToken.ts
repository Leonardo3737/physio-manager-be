import { Model, Optional } from 'sequelize';

export interface IPasswordResetToken {
  id: number
  userId: number
  token: string
  used: boolean
  expiresAt: Date
  createdAt: Date
}

export interface ICreatePasswordResetToken extends Optional<IPasswordResetToken, 'id' | 'used' | 'createdAt'> {}