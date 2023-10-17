import { Request, Response, NextFunction } from "express";

function protectRoutes(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }
  next();
}

export default protectRoutes;
