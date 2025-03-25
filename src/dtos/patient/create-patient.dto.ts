import { z } from "zod";
import { DTO } from "../dto";
import { PatientSchema } from "./patient.schema";

export const CreatePatientSchema = PatientSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreatePatientType = z.infer<typeof CreatePatientSchema>

export class CreatePatientDTO extends DTO<typeof CreatePatientSchema> {
  protected rules() {
    return CreatePatientSchema
  }
}