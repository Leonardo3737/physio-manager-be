import { z } from 'zod'
import { PatientSchema } from '../patient/patient.schema'
import { AppointmentStatus } from '../../enum/appointment-status.enum'

export const AppointmentSchema = z.object({
  id: z.number(),
  patientId: z.coerce.number(),
  appointmentTypeId: z.coerce.number(),  
  patient: z.lazy((()=> PatientSchema) as ()=> z.AnyZodObject).optional(),
  date: z.coerce.date(),
  notes: z.string().max(1000).nullable().optional(),
  initialDiscomfort: z.number().int().min(0).max(10),
  finalDiscomfort: z.number().int().min(0).max(10),
  status: z.nativeEnum(AppointmentStatus),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export type AppointmentType = z.infer<typeof AppointmentSchema>