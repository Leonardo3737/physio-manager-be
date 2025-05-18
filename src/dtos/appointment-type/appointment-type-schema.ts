import { z } from 'zod';

export const AppointmentTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(100),
  description: z.string().max(255).nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type AppointmentTypeType = z.infer<typeof AppointmentTypeSchema>;
