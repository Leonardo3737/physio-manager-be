export class AppError {
  constructor(
    public readonly message: string = 'internal server error',
    public readonly statusCode = 500,
    public readonly code: string = "Error",
  ) {
    console.log('erro');
    
  }
}