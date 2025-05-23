import { Application, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserAuthDTO } from "../dtos/user/user-auth.dto";
import { AppError } from "../config/errors/app.error";
import { getParamsId } from "../utils/get-params-id";
import { RequestResetPasswordDTO, ResetPasswordDTO } from "../dtos/user/reset-password";
import { UpdateUserDTO } from "../dtos/user/update-user.dto";

export class UserController {

  static path = '/user'
  static pathWithId = `${UserController.path}/:id`

  static authPath = `${UserController.path}/auth`
  static requestResetPasswordPath = `${UserController.path}/request-reset-password`
  static resetPasswordPath = `${UserController.path}/reset-password`

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

     app.get(UserController.path + '-infos', async (req: Request, res: Response) => {
      if(!req.user) {
        throw new AppError('unauthorized', 401)
      }
      const user = await this.service.listUserById(req.user.sub)
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
      res.status(200).send({ token })
    })

    app.post(UserController.requestResetPasswordPath, async (req: Request, res: Response) => {
      const data = new RequestResetPasswordDTO({
        ...req.body
      })

      await this.service.requestResetPassword(data)

      res.status(201).send()
    })

    app.patch(UserController.resetPasswordPath, async (req: Request, res: Response) => {
      const data = new ResetPasswordDTO({
        ...req.body
      })

      await this.service.resetPassword(data)

      res.status(204).send()
    })

    app.patch(UserController.pathWithId, async (req: Request, res: Response) => {
      const data = new UpdateUserDTO({
        ...req.body
      })
      const userId = getParamsId(req)
      const newUser = await this.service.alterUser(userId, data)
      res.status(204).send(newUser)
    })

  }

}