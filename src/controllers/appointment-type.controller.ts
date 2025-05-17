// src/controllers/appointment-type.controller.ts
import { Request, Response } from "express";
import { AppointmentTypeService } from "../services/appointment-type.service";
import { CreateAppointmentTypeDTO } from "../dtos/appointment-type/create-appointment-type.dto";
import { UpdateAppointmentTypeDTO } from "../dtos/appointment-type/update-appointment-type.dto";
import { ListAppointmentTypeDTO } from "../dtos/appointment-type/list-appointment-type.dto";
import { getParamsId } from "../utils/get-params-id";

export class AppointmentTypeController {
  constructor(private service: AppointmentTypeService) {}

  async index(req: Request, res: Response) {
    const data = new ListAppointmentTypeDTO({ ...req.query });
    const filters = data.getAll(); 
    const appointmentTypes = await this.service.findAll(filters);
    return res.json(appointmentTypes);
  }

  async show(req: Request, res: Response) {
    const id = getParamsId(req);
    const appointmentType = await this.service.findById(id);
    if (!appointmentType) return res.status(404).json({ message: 'Not found' });
    return res.json(appointmentType);
  }

  async store(req: Request, res: Response) {
    const data = new CreateAppointmentTypeDTO({ ...req.body });
    const newAppointmentType = await this.service.create(data);
    return res.status(201).json(newAppointmentType);
  }

  async update(req: Request, res: Response) {
    const id = getParamsId(req);
    const data = new UpdateAppointmentTypeDTO({ ...req.body });
    const updated = await this.service.update(id, data);
    return res.json(updated);
  }

  async destroy(req: Request, res: Response) {
    const id = getParamsId(req);
    await this.service.delete(id);
    return res.status(204).send();
  }
}
