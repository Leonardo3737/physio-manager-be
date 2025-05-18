import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { CreateScheduleType } from '../dtos/schedule/create-schedule.dto';
import { ScheduleType } from '../dtos/schedule/schedule.schema';
import { ScheduleStatus } from '../enum/schedule-status.enum';
import AppointmentType from './appointment-type.model';
import Patient from './patient.model';

class Schedule extends Model<ScheduleType, CreateScheduleType> {
  declare id: number;
  declare patientId: number;
  declare appointmentTypeId: number;
  declare date: Date;
  declare initialDiscomfort: number;
  declare finalDiscomfort: number;
  declare notes: string | null;
  declare status: ScheduleStatus;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Schedule.init({
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
    type: DataTypes.ENUM(...Object.values(ScheduleStatus)),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'schedules',
  modelName: 'schedule',
  timestamps: true,
  underscored: true
});

Schedule.belongsTo(Patient, {
  foreignKey: 'patientId',
  as: 'patient'
});

Patient.hasMany(Schedule, {
  foreignKey: 'patientId',
  as: 'schedules'
});

Schedule.belongsTo(AppointmentType, {
  foreignKey: 'appointment_type_id',
  as: 'appointmentType'
});

AppointmentType.hasMany(Schedule, {
  foreignKey: 'appointmentTypeId',
  as: 'schedules'
});

export default Schedule;
