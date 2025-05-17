import { z } from 'zod';
import { DTO } from "../dto";
import { ResponseSchema } from '../response/response.schema';
import { PatientSchema } from "./patient.schema";

export const ListPatientSchema = ResponseSchema(PatientSchema)

export type ListPatientType = z.infer<typeof ListPatientSchema>;

export class ListPatientDTO extends DTO<typeof ListPatientSchema> {
  protected rules() {
    return ListPatientSchema
  }
}