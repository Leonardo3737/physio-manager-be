import { Application, Request, Response } from "express";
import { PatientService } from "../services/patient.service";
import { CreatePatientDTO } from "../dtos/patient/create-patient.dto";
import { UpdatePatientDTO } from "../dtos/patient/update-patient.dto";

export class PatientController {

  static path = '/patient'

  constructor(
    private app: Application,
    private service: PatientService
  ) {

    app.delete(PatientController.path, (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const patientDeleted = this.service.deletePatient(id)
      res.status(200).send(patientDeleted)
    })

    app.get(PatientController.path, (req: Request, res: Response) => {
      const data = new UpdatePatientDTO({
        ...req.body
      })

      const patients = this.service.listAllPatients(data)
      res.send(patients)
    })

    app.get('/patient/:id', (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const patient = this.service.listPatientById(id)
      res.send(patient)
    })

    app.post(PatientController.path, (req: Request, res: Response) => {
      const data = new CreatePatientDTO({
        ...req.body
      })

      const newPatient = this.service.registerPatient(data)
      res.send(newPatient).status(201)
    })

    app.put(PatientController.path, (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new UpdatePatientDTO({
        ...req.body
      })

      this.service.alterPatient(id, data)
    })
  }

}