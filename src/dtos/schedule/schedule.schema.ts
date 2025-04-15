import { z } from 'zod'
import { ScheduleStatus } from '../../enum/schedule-status.enum'

export const ScheduleSchema = z.object({
  id: z.number(),
  patientId: z.number(),
  date: z.coerce.date(),
  status: z.nativeEnum(ScheduleStatus),
  notes: z.string().nullable().optional(), 
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export type ScheduleType = z.infer<typeof ScheduleSchema>
