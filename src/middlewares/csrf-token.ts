import { Request, Response, NextFunction } from 'express';

function addCsrfToken(req: Request, res: Response, next: NextFunction): void {
  if (res.locals.csrfToken) {
    // ako je vec generisan, ne generisi novi
    return next();
  }

  if (typeof req.csrfToken === 'function') {
    // ako je csrfToken funkcija, setuj token u res.locals
    res.locals.csrfToken = req.csrfToken();
    console.log('CSRF Token:', res.locals.csrfToken);
  } else {
    console.error('Greska: csrfToken nije funkcija');
  }

  next();
}

export default addCsrfToken;
