// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto'

export const UpdateScheduleSchema = ScheduleSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true
}) // campos já são obrigatórios

export type UpdateScheduleType = z.infer<typeof UpdateScheduleSchema>

export class UpdateScheduleDTO extends DTO<typeof UpdateScheduleSchema> {
  protected rules() {
    return UpdateScheduleSchema
  }
}
