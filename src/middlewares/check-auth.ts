import { Request, Response, NextFunction } from "express";


interface CustomSessionData {
  uid?: string; 
  // ako trebaju jos neki propertisi...odje
}


declare module 'express-session' {
  interface SessionData {
    customData: CustomSessionData;
  }
}

function checkAuthStatus(req: Request, res: Response, next: NextFunction) {
  
  const uid = (req.session && req.session.customData && req.session.customData.uid) || null;

  if (!uid) {
    // ako 'uid' nije prisutan, korisnik nije logovan
    res.locals.isAuth = false;
    return next();
  }

  // ako jeste,....ok je
  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

export default checkAuthStatus;
