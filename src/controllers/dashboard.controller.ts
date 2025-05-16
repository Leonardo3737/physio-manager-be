import { Application, Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { getParamsId } from "../utils/get-params-id";

export class DashboardController {

  static path = '/dashboard'

  constructor(
    private app: Application,
    private service: DashboardService
  ) {

    app.get(DashboardController.path, async (req: Request, res: Response) => {
      const dashboard = await this.service.getDashboard()
      res.send(dashboard)
    })
  }

}