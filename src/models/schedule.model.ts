import { DataTypes, Model } from 'sequelize';
import { ScheduleType } from '../dtos/schedule/schedule.schema';
import { CreateScheduleType } from '../dtos/schedule/create-schedule.dto';
import sequelize from '../config/db-connection';
import { ScheduleStatus } from '../enum/schedule-status.enum';
import Patient from './patient.model';

class Schedule extends Model<ScheduleType, CreateScheduleType> {
    declare id: number;
    declare patientId: number;
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
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    patientId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finalDiscomfort: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true
    },
    initialDiscomfort: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true
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
    timestamps: true
});

Schedule.belongsTo(Patient, {
    foreignKey: 'patientId',
    as: 'patient'
})

export default Schedule;
