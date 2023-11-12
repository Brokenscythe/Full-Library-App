import { Request, Response, NextFunction } from 'express';


function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (res.locals.isAuth) {

    next();
  } else {

    res.redirect('/login');
  }
}

export default isLoggedIn;
