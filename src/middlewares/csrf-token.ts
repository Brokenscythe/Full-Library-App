import { Request, Response, NextFunction } from 'express';

function addCsrfToken(req: Request, res: Response, next: NextFunction): void {
  if (res.locals.csrfToken) {
    // ako je srfToken vec setovan, idemo na sledeci middleware
    return next();
  }

  if (typeof req.csrfToken === 'function') {
    // If csrfToken is a function, set the token in res.locals
    res.locals.csrfToken = req.csrfToken();
    console.log('CSRF Token set:', res.locals.csrfToken);
  } else {
    console.error('Error: csrfToken is not a function');
  }

  next();
}

export default addCsrfToken;
