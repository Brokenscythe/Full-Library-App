import { Request, Response, NextFunction } from "express";

function checkAuthStatus(req: Request, res: Response, next: NextFunction) {
  const uid = (req.session as any).uid;

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

export default checkAuthStatus;
