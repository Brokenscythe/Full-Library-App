import { Request, Response } from "express";
import session from "express-session";

interface CustomSession extends session.Session {
  uid?: string | null;
}

function createUserSession(req: Request, user: { id: number }, action: () => void) {
  const customSession = req.session as CustomSession;
  customSession.uid = user.id.toString();

  req.session.save((err: any) => {
    if (err) {
      console.error("Session save error:", err);
    }
    action();
  });
}

function destroyUserSession(req: Request, res: Response) {
  const customSession = req.session as CustomSession;
  customSession.uid = null;

  req.session.destroy((err: any) => {
    if (err) {
      console.error("Session destroy error:", err);
    }
    res.redirect("/login");
  });
}

export default { createUserSession, destroyUserSession };
