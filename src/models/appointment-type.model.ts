import { DataTypes, Model } from 'sequelize';
import Schedule from './schedule.model'
import sequelize from '../config/db-connection';

export interface AppointmentTypeAttributes {
    id: number;
    name: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AppointmentTypeCreationAttributes {
    name: string;
    description?: string | null;
}

class AppointmentType extends Model<AppointmentTypeAttributes, AppointmentTypeCreationAttributes> implements AppointmentTypeAttributes {
    declare id: number;
    declare name: string;
    declare description: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;
}

AppointmentType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'appointment_type',
    modelName: 'AppointmentType',
    timestamps: true,
    underscored: true
});
AppointmentType.hasMany(Schedule, {
    foreignKey: 'appointment_type_id',
    as: 'schedules'
});

export default AppointmentType;
