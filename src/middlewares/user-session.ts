// src/middleware/user-session.ts

import { Request, Response, NextFunction } from 'express';

export const setUserNameLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.userName = (req.session as any).userName || null; // Assuming userName is stored in the session
  next();
};
