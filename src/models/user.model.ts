import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { UserType } from "../dtos/user/user.schema";
import { CreateUserType } from "../dtos/user/create-user.dto";


class User extends Model<UserType, CreateUserType> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare register: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  register: {
    type: new DataTypes.CHAR(11),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'user'
})

export default User