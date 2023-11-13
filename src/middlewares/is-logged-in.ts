// isLoggedIn.ts
import { Request, Response, NextFunction } from 'express';
import checkAuthStatus from '../middlewares/check-auth';

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  console.log('isLoggedIn middleware executed for path:', req.path);
  console.log('Session:', req.session);
  checkAuthStatus(req, res, () => {
    if (res.locals.isAuth) {
      next();
    } else {
      res.redirect('/login');
    }
  });
}

export default isLoggedIn;
