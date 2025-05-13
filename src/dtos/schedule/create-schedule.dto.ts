import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto'

export const CreateScheduleSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  initialDiscomfort: true,
  finalDiscomfort: true,
  updatedAt: true,
}).extend({
  status: ScheduleSchema.shape.status.optional(), // apenas "notes" opcional
});


export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>

export class CreateScheduleDTO extends DTO<typeof CreateScheduleSchema> {
  protected rules() {
    return CreateScheduleSchema
  }
}
