import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { AppointmentTypeType } from '../dtos/appointment-type/appointment-type-schema';
import { CreateAppointmentTypeType } from '../dtos/appointment-type/create-appointment-type.dto';

class AppointmentType extends Model<AppointmentTypeType, CreateAppointmentTypeType> {
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

export default AppointmentType;
