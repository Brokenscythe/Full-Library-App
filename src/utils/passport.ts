import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../controllers/auth-controllers/authController";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    const user = await db.user.findUnique({ where: { email } });
    const response = "Invalid login credentials";

    if (!user) return done(response);
    else if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) return done(null, user);
      return done(response);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await db.user.findUnique({ where: { id: id } });
  if (!user) return done("No user to deserialize");
  return done(null, user);
});

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  res.status(401).redirect("/login");
}
