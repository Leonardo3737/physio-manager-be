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
    type: DataTypes.INTEGER.UNSIGNED,
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
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'password-reset-token'
})

PasswordResetToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'patient'
});

export default PasswordResetToken