
import { Application, Request, Response } from "express";
import { CreateAppointmentDTO } from "../dtos/appointment/create-appointment.dto";
import { UpdateAppointmentDTO } from "../dtos/appointment/update-appointment.dto";
import { AppointmentFilterDTO } from "../dtos/appointment/appointment-filter.dto";
import { StartAppointmentDTO } from "../dtos/appointment/start-appointment.dto";
import { ConcludeAppointmentDTO } from "../dtos/appointment/conclude-appointment.dto";
import { AppointmentService } from "../services/appointment.service";

export class AppointmentController {

  static path = '/appointment'
  static pathWithId = `${AppointmentController.path}/:id`

  constructor(
    private app: Application,
    private service: AppointmentService
  ) {
    app.get(AppointmentController.path, async (req: Request, res: Response) => {
      const data = new AppointmentFilterDTO({
        ...req.query
      })

      const appointments = await this.service.listAllAppointments(data)
      res.send(appointments)
    })

    app.get(AppointmentController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const appointment = await this.service.getAppointmentById(id)
      res.send(appointment)
    })

    app.post(AppointmentController.path, async (req: Request, res: Response) => {
      const data = new CreateAppointmentDTO({
        ...req.body
      })

      const { force: auxForce } = req.query      
      const force = auxForce === "true"

      const newAppointment = await this.service.registerAppointment(data, force)
      res.status(201).send(newAppointment)
    })

    app.patch(AppointmentController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new UpdateAppointmentDTO({
        ...req.body
      })

      const { force: auxForce } = req.query      
      const force = auxForce === "true"

      await this.service.alterAppointment(id, data, force)
      res.status(204).send()
    })

    app.patch(`${AppointmentController.pathWithId}/cancel`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)

      await this.service.cancelAppointment(id)
      res.status(204).send()
    })

    app.patch(`${AppointmentController.pathWithId}/active`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)

      await this.service.activeAppointment(id)
      res.status(204).send()
    })

    app.patch(`${AppointmentController.pathWithId}/start`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new StartAppointmentDTO({
        ...req.body
      })

      await this.service.startAppointment(id, data)
      res.status(204).send()
    })

    app.patch(`${AppointmentController.pathWithId}/conclude`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new ConcludeAppointmentDTO({
        ...req.body
      })

      await this.service.concludeAppointment(id, data)
      res.status(204).send()
    })


    app.delete(AppointmentController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      await this.service.deleteAppointment(id)
      res.status(204).send()
    })
  }
}
