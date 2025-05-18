// src/controllers/appointment-type.controller.ts
import { Application, Request, Response } from "express";
import { AppointmentTypeFilterDTO } from '../dtos/appointment-type/appointment-type-filter.dto';
import { CreateAppointmentTypeDTO } from "../dtos/appointment-type/create-appointment-type.dto";
import { UpdateAppointmentTypeDTO } from "../dtos/appointment-type/update-appointment-type.dto";
import { AppointmentTypeService } from "../services/appointment-type.service";
import { getParamsId } from "../utils/get-params-id";

export class AppointmentTypeController {

  static path = '/appointment-type'
  static pathWithId = `${AppointmentTypeController.path}/:id`

  constructor(
    private app: Application,
    private service: AppointmentTypeService
  ) {
    app.get(AppointmentTypeController.path, async (req: Request, res: Response) => {
      const filters = new AppointmentTypeFilterDTO({ ...req.query });
      const appointmentTypes = await this.service.findAll(filters);
      res.send(appointmentTypes);
    });

    app.get(AppointmentTypeController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req);
      const appointmentType = await this.service.findById(id);
      res.send(appointmentType);
    });

    app.post(AppointmentTypeController.path, async (req: Request, res: Response) => {
      const data = new CreateAppointmentTypeDTO({ ...req.body });
      const newAppointmentType = await this.service.create(data);
      res.status(201).send(newAppointmentType);
    });

    app.patch(AppointmentTypeController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req);
      const data = new UpdateAppointmentTypeDTO({ ...req.body });
      await this.service.update(id, data);
      res.status(204).send();
    });

    app.delete(AppointmentTypeController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req);
      await this.service.delete(id);
      res.status(204).send();
    });
  }
}
