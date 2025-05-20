import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { CreateAppointmentType } from '../dtos/appointment/create-appointment.dto';
import { AppointmentType } from '../dtos/appointment/appointment.schema';
import { AppointmentStatus } from '../enum/appointment-status.enum';

import Patient from './patient.model';
import AppointmentTypeModel from './appointment-type.model';

class Appointment extends Model<AppointmentType, CreateAppointmentType> {
  declare id: number;
  declare patientId: number;
  declare appointmentTypeId: number;
  declare date: Date;
  declare initialDiscomfort: number;
  declare finalDiscomfort: number;
  declare notes: string | null;
  declare status: AppointmentStatus;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  appointmentTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  finalDiscomfort: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  initialDiscomfort: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'appointment',
  modelName: 'appointment',
  timestamps: true,
  underscored: true
});

Appointment.belongsTo(Patient, {
  foreignKey: 'patient_id',
  as: 'patient'
});

Patient.hasMany(Appointment, {
  foreignKey: 'patient_id',
  as: 'appointments'
});

Patient.hasOne(Appointment, {
  foreignKey: 'patient_id',
  as: 'lastCompletedAppointment',
})

Appointment.belongsTo(AppointmentTypeModel, {
  foreignKey: 'appointment_type_id',
  as: 'appointmentType'
});

AppointmentTypeModel.hasMany(Appointment, {
  foreignKey: 'appointment_type_id',
  as: 'appointments'
});

export default Appointment;
