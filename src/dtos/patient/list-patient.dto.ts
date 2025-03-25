import { DTO } from "../dto";
import { PatientSchema } from "./patient.schema";

export class ListPatientDTO extends DTO<typeof PatientSchema> {
  protected rules() {
    return PatientSchema
  }
}