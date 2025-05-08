import type { NextFunction, Request, Response } from "express";
import { AppError } from "../config/errors/app.error";
import { ValidationError } from "../config/errors/validation.error";

export default function responseError(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
    return
  }
  if (error instanceof ValidationError) {    
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message, // vou mostrar as duas formas
      issues: error.issues
    });
    return
  }


  response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}