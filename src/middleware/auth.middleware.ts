import { NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { isJWTValid } from "../utils/jwt";
import { AppError } from "../config/errors/app.error";

const publicRoutes = [
  UserController.authPath
]

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { path } = req
  const securityPath = path.split('?')[0]

  if(publicRoutes.includes(securityPath)) {
    next()
    return
  }

  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if(!token || !isJWTValid(token)) {
    throw new AppError('token is required', 401, 'UNAUTHORIZED')
  }

  next()
}