import { Request, Response, NextFunction } from "express";

function handleErrors(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error);
  res.status(500).render("shared/500");
}

export default handleErrors;
