import { z, ZodError } from "zod"
import { ValidationError } from "../config/errors/validation.error";
import { AppError } from "../config/errors/app.error";

export abstract class DTO<Schema extends z.ZodType> {

  protected data: z.infer<Schema>

  public constructor (
    data: Record<string, unknown>
  ) {    
    this.validate(data)
  }

  protected abstract rules(): Schema;

  private validate(data: Record<string, unknown>) {
    try {
      this.data = this.rules().parse(data)
      
    }
    catch (error) {
      console.log(error);
      if(error instanceof ZodError) {
        throw new ValidationError(error)
      }
      throw new AppError('Internal Server Error', 500)
    }
  }

  public getAll(): z.infer<Schema> {
    return this.data
  }

  public get<Key extends keyof z.infer<Schema>>(key: Key) {
    return this.data[key]
  }
}