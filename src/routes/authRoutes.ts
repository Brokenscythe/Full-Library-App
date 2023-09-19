import express from "express";
import type { Request, Response } from "express";
import passport from "passport";
//import { isNotLoggedIn } from '../../utils/passport';

import * as AuthService from "../controllers/auth-controllers/authController";
const authRouter = express.Router();

authRouter.get("/login", async (req: Request, res: Response) => {
  res.render("login");
});

authRouter.post("/login", passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" }));

authRouter.get("/register", async (req: Request, res: Response) => {
  res.render("register");
});

authRouter.post("/register", async (req: Request, res: Response) => {
  if (req.body.name && req.body.email && req.body.password) {
    AuthService.createUser(req.body.name, req.body.email, req.body.password);
    res.redirect("/login");
  }
  res.redirect("/register");
});

authRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

authRouter.get("/logout", (req, res) => {
  res.render("logout");
});

export default authRouter;