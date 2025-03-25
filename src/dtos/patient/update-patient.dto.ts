import { z } from "zod";
import { DTO } from "../dto";
import { PatientSchema } from "./patient.schema";
import { CreatePatientSchema } from "./create-patient.dto";

export const UpdatePatientSchema = CreatePatientSchema.partial()

export type UpdatePatientType = z.infer<typeof UpdatePatientSchema>

export class UpdatePatientDTO extends DTO<typeof UpdatePatientSchema> {
  protected rules() {
    return UpdatePatientSchema    
  }
}