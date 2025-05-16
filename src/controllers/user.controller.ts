import { Application, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserAuthDTO } from "../dtos/user/user-auth.dto";
import { AppError } from "../config/errors/app.error";
import { getParamsId } from "../utils/get-params-id";

export class UserController {

  static path = '/user'
  static pathWithId = `${UserController.path}/:id`
  static authPath = `${UserController.path}/auth`

  constructor(
    private app: Application,
    private service: UserService
  ) {

    app.delete(UserController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req)

      await this.service.deleteUser(id)
      res.status(204).send()
    })

    app.get(UserController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req)
      const user = await this.service.listUserById(id)
      res.send(user)
    })

    app.post(UserController.path, async (req: Request, res: Response) => {
      const data = new CreateUserDTO({
        ...req.body
      })

      const newUser = await this.service.registerUser(data)
      res.status(201).send(newUser)
    })

    app.post(UserController.authPath, async (req: Request, res: Response) => {
      const data = new UserAuthDTO({
        ...req.body
      })      

      const token = await this.service.userAuth(data)
      res.status(200).send({token})
    })

  }

}