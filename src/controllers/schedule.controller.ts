
import { Application, Request, Response } from "express";
import { ScheduleService } from "../services/schedule.service";
import { CreateScheduleDTO } from "../dtos/schedule/create-schedule.dto";
import { UpdateScheduleDTO } from "../dtos/schedule/update-schedule.dto";
import { ListScheduleDTO } from "../dtos/schedule/list-schedule.dto";

export class ScheduleController {

  static path = '/schedule'
  static pathWithId = `${ScheduleController.path}/:id`

  constructor(
    private app: Application,
    private service: ScheduleService
  ) {

    app.delete(ScheduleController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      await this.service.deleteSchedule(id)
      res.status(204).send()
    })

    app.get(ScheduleController.path, async (req: Request, res: Response) => {
      const data = new ListScheduleDTO({
        ...req.body
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

      const newSchedule = await this.service.registerSchedule(data)
      res.status(201).send(newSchedule)
    })

    app.put(ScheduleController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new UpdateScheduleDTO({
        ...req.body
      })

      await this.service.alterSchedule(id, data)
      res.status(204).send()
    })
  }
}
