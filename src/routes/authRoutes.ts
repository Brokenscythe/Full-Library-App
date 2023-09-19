import express from "express";
import type { Request, Response, NextFunction } from "express";
import passport from "passport";
//import { isNotLoggedIn } from '../../utils/passport';

import * as AuthService from "../controllers/auth-controllers/authController";
const authRouter = express.Router();

authRouter.get("/login", AuthService.getLogIn);

authRouter.post("/login", AuthService.login);

authRouter.get("/register", AuthService.getRegister);

authRouter.post("/register", AuthService.signup);

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
