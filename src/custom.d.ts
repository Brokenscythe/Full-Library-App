import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string,
    csrfToken: string; 
  }
}

declare module 'express' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}