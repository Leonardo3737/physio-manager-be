import { AppError } from "../config/errors/app.error";
import { CreatePatientType } from "../dtos/patient/create-patient.dto";
import { ListPatientDTO } from "../dtos/patient/list-patient.dto";
import { PatientType } from "../dtos/patient/patient.schema";
import { UpdatePatientType } from "../dtos/patient/update-patient.dto";
import { ICreatePasswordResetToken, IPasswordResetToken } from "../interfaces/IPasswordResetToken";
import PasswordResetToken from "../models/password-reset-token";
import Patient from "../models/patient.model";

export class PasswordResetTokenRepository {

  async createPasswordResetToken(newPasswordResetToken: ICreatePasswordResetToken): Promise<IPasswordResetToken> {
    const process = await PasswordResetToken.create(newPasswordResetToken)

    const patientCreated = { ...process.dataValues }

    return patientCreated
  }

  async deletePasswordResetToken(id: number): Promise<void> {
    await PasswordResetToken.destroy({ where: { id } })
  }

  async listPasswordResetTokenByToken(token: string): Promise<IPasswordResetToken | null> {
    const passwordResetToken = await PasswordResetToken.findOne({
      where: {
        token
      }
    })
    return passwordResetToken
  }
}