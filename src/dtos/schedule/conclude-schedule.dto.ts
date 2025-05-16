// update-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto'

export const ConcludeScheduleSchema = ScheduleSchema.pick({
  initialDiscomfort: true,
  finalDiscomfort: true,
  notes: true,
})

export type ConcludeScheduleType = z.infer<typeof ConcludeScheduleSchema>

export class ConcludeScheduleDTO extends DTO<typeof ConcludeScheduleSchema> {
  protected rules() {
    return ConcludeScheduleSchema
  }
}
