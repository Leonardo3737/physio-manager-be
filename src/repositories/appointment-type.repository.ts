import AppointmentType from '../models/appointment-type.model';
import { CreateAppointmentTypeDTO } from '../dtos/appointment-type/create-appointment-type.dto';
import { UpdateAppointmentTypeDTO } from '../dtos/appointment-type/update-appointment-type.dto';

interface PaginationFilter {
  page?: number;
  perPage?: number;
}

export class AppointmentTypeRepository {
  async create(data: CreateAppointmentTypeDTO) {
    return await AppointmentType.create(data.getAll());
  }

  async update(id: number, data: UpdateAppointmentTypeDTO) {
    await AppointmentType.update(data.getAll(), {
      where: { id }
    });

    return this.findById(id);
  }

  async delete(id: number) {
    return await AppointmentType.destroy({ where: { id } });
  }

  async findById(id: number) {
    return await AppointmentType.findByPk(id, {
      include: { association: 'schedules' }
    });
  }

  async findAll(filter?: PaginationFilter) {
    const page = filter?.page ?? 1;
    const perPage = filter?.perPage ?? 10;
    const offset = (page - 1) * perPage;

    const { rows, count } = await AppointmentType.findAndCountAll({
      offset,
      limit: perPage,
      order: [['createdAt', 'DESC']]
    });

    return {
      data: rows,
      total: count,
      page,
      perPage
    };
  }
}
