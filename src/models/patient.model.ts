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
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: true
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'patient',
  underscored: true
})

export default Patient