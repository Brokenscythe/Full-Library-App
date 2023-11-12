import { Request, Response, NextFunction } from "express";

function protectRoutes(req: Request, res: Response, next: NextFunction) {
  if (!res.locals.isAuth) {
    return res.redirect("/login");
  }
  next();
}

export default protectRoutes;
