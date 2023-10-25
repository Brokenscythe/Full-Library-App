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


function checkAuthStatus(req, res, next) {
  const uid = (req.session && req.session.customData && req.session.customData.uid) || null;

  if (!uid) {
    res.locals.isAuth = false;
    //res.locals.csrfToken = req.csrfToken(); // Assign the CSRF token to res.locals
   // return res.render('auth/login', { error: 'Pogresan email ili password', csrfToken: res.locals.csrfToken });

  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}


export default checkAuthStatus;
