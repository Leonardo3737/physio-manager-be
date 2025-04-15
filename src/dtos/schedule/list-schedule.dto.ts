import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'

export class ListScheduleDTO {
  private data: z.infer<typeof ScheduleSchema>

  constructor(payload: unknown) {
    this.data = ScheduleSchema.parse(payload)
  }

  getAll() {
    return this.data
  }
}