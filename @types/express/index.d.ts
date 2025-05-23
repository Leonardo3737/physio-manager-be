import { PayloadType } from "../../src/utils/jwt";


declare global {
  namespace Express {
    interface Request {
      user?: PayloadType
    }
  }
}