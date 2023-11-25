

import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

interface CustomSession {
  uid?: string | null;
  // Dodao sam username
  username?: string;
}

function createUserSession(req: Request, user: { id: number; username: string }, action: () => void) {
  const customSession = req.session as unknown as CustomSession;
  customSession.uid = user.id.toString();
  customSession.username = user.username;

  req.session.save((err: any) => {
    if (err) {
      console.error('Session save error:', err);
    }
    action();
  });
}

function destroyUserSession(req: Request, res: Response) {
  const customSession = req.session as CustomSession;
  customSession.uid = null;

  req.session.destroy((err: any) => {
    if (err) {
      console.error('Session destroy error:', err);
    }
    res.redirect('/login');
  });
}

//dodao sam ovaj dio da bi cuvao username u res.local
export const setSessionLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.session = req.session;
  next();
};

export default { createUserSession, destroyUserSession, setSessionLocals };
