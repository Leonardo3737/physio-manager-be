import { DataTypes, Model } from 'sequelize';
import { ScheduleType } from '../dtos/schedule/schedule.schema';
import { CreateScheduleType } from '../dtos/schedule/create-schedule.dto';
import sequelize from '../config/db-connection';
import { ScheduleStatus } from '../enum/schedule-status.enum'; // Importando o Enum

class Schedule extends Model<ScheduleType, CreateScheduleType> {
    declare id: number;
    declare patientId: number;
    declare date: Date;
    declare status: ScheduleStatus; // Alterado para o tipo ScheduleStatus
    declare notes: string | null;
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
    status: {
        type: DataTypes.ENUM(...Object.values(ScheduleStatus)), // Usando o ENUM do ScheduleStatus
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'schedules',
    modelName: 'schedule',
    timestamps: true
});

export default Schedule;
