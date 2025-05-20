import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { ICreatePasswordResetToken, IPasswordResetToken } from "../interfaces/IPasswordResetToken";
import User from "./user.model";

class PasswordResetToken extends Model<IPasswordResetToken, ICreatePasswordResetToken> {
  declare id: number;
  declare userId: number
  declare token: string
  declare used: boolean
  declare expiresAt: Date
  declare createdAt: Date
}

PasswordResetToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  token: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'password_reset_token',
  underscored: true
})

PasswordResetToken.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'patient'
});

export default PasswordResetToken