/* import { Request } from "express";
import { SessionData } from "express-session";

interface CustomSessionData extends SessionData {
  flashedData?: any;
}

interface CustomSession {
  data: CustomSessionData;
  save(callback: (err?: any) => void): void;
}

function getSessionData(req: Request): any {
  const session = req.session as unknown as CustomSession;
  session.data = session.data || {};
  const sessionData = session.data.flashedData;

  session.data.flashedData = null;

  return sessionData;
}

function flashDataToSession(req: Request, data: any, action: () => void): void {
  const session = req.session as unknown as CustomSession;
  session.data = session.data || {};
  session.data.flashedData = data;

  session.save(action);
}

export default { getSessionData, flashDataToSession };
 */
import { Request } from "express";
import { SessionData } from "express-session";

interface CustomSessionData extends SessionData {
  flashedData?: any;
}

interface CustomSession {
  data: CustomSessionData;
  save(callback: (err?: any) => void): void;
}

function getSessionData(req: Request): any {
  const session = req.session as unknown as CustomSession;
  session.data = session.data || {};
  const sessionData = session.data.flashedData;

  session.data.flashedData = undefined; // Instead of null

  return sessionData;
}

function flashDataToSession(req: Request, data: any, action: () => void): void {
  const session = req.session as unknown as CustomSession;
  session.data = session.data || {};
  session.data.flashedData = data;

  session.save(action);
}

export default { getSessionData, flashDataToSession };
