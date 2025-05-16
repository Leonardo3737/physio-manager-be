
import { Application, Request, Response } from "express";
import { ScheduleService } from "../services/schedule.service";
import { CreateScheduleDTO } from "../dtos/schedule/create-schedule.dto";
import { UpdateScheduleDTO } from "../dtos/schedule/update-schedule.dto";
import { ListScheduleDTO } from "../dtos/schedule/list-schedule.dto";
import { ScheduleFilterDTO } from "../dtos/schedule/schedule-filter.dto";
import { StartScheduleDTO } from "../dtos/schedule/start-schedule.dto";
import { ConcludeScheduleDTO } from "../dtos/schedule/conclude-schedule.dto";

export class ScheduleController {

  static path = '/schedule'
  static pathWithId = `${ScheduleController.path}/:id`

  constructor(
    private app: Application,
    private service: ScheduleService
  ) {
    app.get(ScheduleController.path, async (req: Request, res: Response) => {
      const data = new ScheduleFilterDTO({
        ...req.query
      })

      const schedules = await this.service.listAllSchedules(data)
      res.send(schedules)
    })

    app.get(ScheduleController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const schedule = await this.service.getScheduleById(id)
      res.send(schedule)
    })

    app.post(ScheduleController.path, async (req: Request, res: Response) => {
      const data = new CreateScheduleDTO({
        ...req.body
      })

      const { force: auxForce } = req.query      
      const force = auxForce === "true"

      const newSchedule = await this.service.registerSchedule(data, force)
      res.status(201).send(newSchedule)
    })

    app.patch(ScheduleController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new UpdateScheduleDTO({
        ...req.body
      })

      const { force: auxForce } = req.query      
      const force = auxForce === "true"

      await this.service.alterSchedule(id, data, force)
      res.status(204).send()
    })

    app.patch(`${ScheduleController.pathWithId}/cancel`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)

      await this.service.cancelSchedule(id)
      res.status(204).send()
    })

    app.patch(`${ScheduleController.pathWithId}/active`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)

      await this.service.activeSchedule(id)
      res.status(204).send()
    })

    app.patch(`${ScheduleController.pathWithId}/start`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new StartScheduleDTO({
        ...req.body
      })

      await this.service.startSchedule(id, data)
      res.status(204).send()
    })

    app.patch(`${ScheduleController.pathWithId}/conclude`, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new ConcludeScheduleDTO({
        ...req.body
      })

      await this.service.concludeSchedule(id, data)
      res.status(204).send()
    })


    app.delete(ScheduleController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      await this.service.deleteSchedule(id)
      res.status(204).send()
    })
  }
}
