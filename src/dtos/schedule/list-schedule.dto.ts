import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto';


export const ListScheduleSchema = ScheduleSchema.extend({
  initialDiscomfort: ScheduleSchema.shape.initialDiscomfort.nullable(),
  finalDiscomfort: ScheduleSchema.shape.finalDiscomfort.nullable(),
});

export type ListScheduleType = z.infer<typeof ListScheduleSchema>

export class ListScheduleDTO extends DTO<typeof ListScheduleSchema> {
  protected rules() {
      return ListScheduleSchema
    }
}