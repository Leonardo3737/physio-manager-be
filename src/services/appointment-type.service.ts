// src/services/appointment-type.service.ts
import { AppointmentTypeRepository } from '../repositories/appointment-type.repository';
import { CreateAppointmentTypeDTO } from '../dtos/appointment-type/create-appointment-type.dto';
import { UpdateAppointmentTypeDTO } from '../dtos/appointment-type/update-appointment-type.dto';

export class AppointmentTypeService {
  constructor(private repository = new AppointmentTypeRepository()) {}

  async create(data: CreateAppointmentTypeDTO) {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateAppointmentTypeDTO) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('AppointmentType not found');
    }
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('AppointmentType not found');
    }
    return this.repository.delete(id);
  }

  async findById(id: number) {
    return this.repository.findById(id);
  }

  async findAll(params: { page?: number; perPage?: number }) {
    return this.repository.findAll(params);
  }
}
