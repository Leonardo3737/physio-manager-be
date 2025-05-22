import { Op } from 'sequelize';
import { AppointmentTypeFilterType } from '../dtos/appointment-type/appointment-type-filter.dto';
import { CreateAppointmentTypeDTO } from '../dtos/appointment-type/create-appointment-type.dto';
import { ListAppointmentTypeType } from '../dtos/appointment-type/list-appointment-type.dto';
import { UpdateAppointmentTypeDTO } from '../dtos/appointment-type/update-appointment-type.dto';
import AppointmentType from '../models/appointment-type.model';
import { CreatePaginatedResponse } from '../utils/create-paginated-response';

export class AppointmentTypeRepository {
  async create(data: CreateAppointmentTypeDTO) {
    return await AppointmentType.create(data.getAll());
  }

  async update(id: number, data: UpdateAppointmentTypeDTO) {
    await AppointmentType.update(data.getAll(), {
      where: { id }
    });
  }

  async delete(id: number) {
    await AppointmentType.destroy({ where: { id } });
  }

  async findById(id: number) {
    return await AppointmentType.findByPk(id, {
      include: { association: 'appointments' }
    });
  }

  async findAll(filter?: AppointmentTypeFilterType): Promise<ListAppointmentTypeType> {
    const { name, page = 1, perPage = 10 } = filter || {}

    const offset = (page - 1) * perPage
    const limit = perPage

    const result = await AppointmentType.findAndCountAll({
      where: {
        ...(name && { name: { [ Op.iLike ]: `%${name}%` } })
      },
      offset,
      limit,
      order: [ [ 'id', 'DESC' ] ]
    });

    return CreatePaginatedResponse({result, page, perPage})
  }
}
