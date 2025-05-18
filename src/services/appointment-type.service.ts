// src/services/appointment-type.service.ts
import { AppError } from '../config/errors/app.error';
import { AppointmentTypeFilterDTO } from '../dtos/appointment-type/appointment-type-filter.dto';
import { CreateAppointmentTypeDTO } from '../dtos/appointment-type/create-appointment-type.dto';
import { UpdateAppointmentTypeDTO } from '../dtos/appointment-type/update-appointment-type.dto';
import { AppointmentTypeRepository } from '../repositories/appointment-type.repository';

export class AppointmentTypeService {
  constructor(private repository = new AppointmentTypeRepository()) { }

  async create(data: CreateAppointmentTypeDTO) {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateAppointmentTypeDTO) {
    await this.findById(id);
    await this.repository.update(id, data);
  }

  async delete(id: number) {
    await this.findById(id);
    await this.repository.delete(id);
  }

  async findById(id: number) {
    const appointmentType = await this.repository.findById(id);
    if (!appointmentType) {
      throw new AppError('AppointmentType not found', 404)
    }
    return appointmentType;
  }

  async findAll(filter: AppointmentTypeFilterDTO) {
    return this.repository.findAll(filter.getAll());
  }
}
