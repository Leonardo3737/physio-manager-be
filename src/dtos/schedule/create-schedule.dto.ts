import { z } from 'zod';
import { DTO } from '../dto';
import { ScheduleSchema } from './schedule.schema';

export const CreateScheduleSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  initialDiscomfort: true,
  finalDiscomfort: true,
  updatedAt: true,
}).extend({
  status: ScheduleSchema.shape.status.optional(),
  initialDiscomfort: ScheduleSchema.shape.initialDiscomfort.optional().nullable(),
  finalDiscomfort: ScheduleSchema.shape.finalDiscomfort.optional().nullable()
});

export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>

export class CreateScheduleDTO extends DTO<typeof CreateScheduleSchema> {
  protected rules() {
    return CreateScheduleSchema
  }
}
