import { Application, Request, Response } from "express";
import { PatientService } from "../services/patient.service";
import { CreatePatientDTO } from "../dtos/patient/create-patient.dto";
import { UpdatePatientDTO } from "../dtos/patient/update-patient.dto";

export class PatientController {

  static path = '/patient'
  static pathWithId = `${PatientController.path}/:id`

  constructor(
    private app: Application,
    private service: PatientService
  ) {

    app.delete(PatientController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      await this.service.deletePatient(id)
      res.status(204).send()
    })

    app.get(PatientController.path, async (req: Request, res: Response) => {
      const data = new UpdatePatientDTO({
        ...req.body
      })

      const patients = await this.service.listAllPatients(data)
      res.send(patients)
    })

    app.get(PatientController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const patient = await this.service.listPatientById(id)
      res.send(patient)
    })

    app.post(PatientController.path, async (req: Request, res: Response) => {
      const data = new CreatePatientDTO({
        ...req.body
      })

      const newPatient = await this.service.registerPatient(data)
      res.status(201).send(newPatient)
    })

    app.put(PatientController.pathWithId, async (req: Request, res: Response) => {
      const id = Number(req.params.id)
      const data = new UpdatePatientDTO({
        ...req.body
      })

      await this.service.alterPatient(id, data)
      res.status(204).send()
    })
  }

}