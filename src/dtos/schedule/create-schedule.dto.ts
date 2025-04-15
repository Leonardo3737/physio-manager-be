// src/dtos/schedule/create-schedule.dto.ts
import { z } from 'zod'
import { ScheduleSchema } from './schedule.schema'
import { DTO } from '../dto'

// Remove campos que não devem ser recebidos na criação
export const CreateScheduleSchema = ScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateScheduleType = z.infer<typeof CreateScheduleSchema>

export class CreateScheduleDTO extends DTO<typeof CreateScheduleSchema> {
  protected rules() {
    return CreateScheduleSchema
  }
}
