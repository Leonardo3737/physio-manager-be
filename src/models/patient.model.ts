import { DataTypes, Model } from "sequelize";
import { PatientType } from "../dtos/patient/patient.schema";
import { CreatePatientType } from "../dtos/patient/create-patient.dto";
import sequelize from "../config/db-connection";


class Patient extends Model<PatientType, CreatePatientType> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare age: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Patient.init({
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
  phone: {
    type: new DataTypes.STRING(11),
    allowNull: false
  },
  age: {
    type: new DataTypes.INTEGER(),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'patient'
})

export default Patient