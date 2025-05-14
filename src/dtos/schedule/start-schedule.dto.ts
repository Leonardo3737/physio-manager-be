// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto'

export const StartScheduleSchema = ScheduleSchema.pick({
  initialDiscomfort: true,
  notes: true,
})

export type StartScheduleType = z.infer<typeof StartScheduleSchema>

export class StartScheduleDTO extends DTO<typeof StartScheduleSchema> {
  protected rules() {
    return StartScheduleSchema
  }
}
