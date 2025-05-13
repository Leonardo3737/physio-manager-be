import { z } from 'zod'
import { ScheduleStatus } from '../../enum/schedule-status.enum'
import { PatientSchema } from '../patient/patient.schema'

export const ScheduleSchema = z.object({
  id: z.number(),
  patientId: z.number(),
  patient: PatientSchema.optional(),
  date: z.coerce.date(),
  notes: z.string().nullable().optional(),
  initialDiscomfort: z.number().int().min(0).max(10).nullable(),
  finalDiscomfort: z.number().int().min(0).max(10).nullable(),
  status: z.nativeEnum(ScheduleStatus),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export type ScheduleType = z.infer<typeof ScheduleSchema>
