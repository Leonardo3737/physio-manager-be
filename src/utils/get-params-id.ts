import { Request } from "express"
import { AppError } from "../config/errors/app.error"

export function getParamsId(req: Request): number {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new AppError('id must be an integer', 400)
  }

  return id
}