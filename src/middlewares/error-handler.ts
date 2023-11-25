// error-handler.ts
import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "Greska Aplikacije";
    this.status = status;
  }
}

function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error);


  if (error instanceof MyCustomError) {
    return res.status(400).render("shared/400");
  }


  if (error instanceof AppError && error.status === 404) {
    return res.status(404).render("/shared/404");
  }


  res.status(500).render("shared/500");
}

class MyCustomError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = "Greska";
  }
}

export { errorHandlerMiddleware, MyCustomError, AppError };
