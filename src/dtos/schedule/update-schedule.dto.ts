// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto'
import { CreateScheduleSchema } from './create-schedule.dto'

export const UpdateScheduleSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial()

export type UpdateScheduleType = z.infer<typeof UpdateScheduleSchema>

export class UpdateScheduleDTO extends DTO<typeof UpdateScheduleSchema> {
  protected rules() {
    return UpdateScheduleSchema
  }
}
