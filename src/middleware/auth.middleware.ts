import { NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { isJWTValid } from "../utils/jwt";
import { AppError } from "../config/errors/app.error";

const publicRoutes = [
  /* {
    path: UserController.path,
    method: 'POST'
  }, */
  {
    path: UserController.authPath,
    method: 'POST'
  },
  {
    path: UserController.resetPasswordPath,
    method: 'PATCH'
  },
  {
    path: UserController.requestResetPasswordPath,
    method: 'POST'
  }
]

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { path, method } = req
  const pathWithoutQuery = path.split('?')[0]

  if (publicRoutes.find(route => route.path === pathWithoutQuery && route.method === method)) {
    next()
    return
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : ''

  const jwtPayload = isJWTValid(token)

  if (!token || !jwtPayload) {
    throw new AppError('token is required', 401, 'UNAUTHORIZED')
  }

  if (pathWithoutQuery.startsWith(`${UserController.path}/`)) {

    const separedPath = pathWithoutQuery.split('/')

    const paramId = Number(separedPath.find(node => node && !isNaN(Number(node))))

    console.log(paramId);
    

    if (paramId && paramId !== Number(jwtPayload.sub)) {
      throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
    }
  }

  req.user = jwtPayload

  next()
}