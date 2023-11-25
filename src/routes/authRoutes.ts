import express from "express";
import * as AuthService from "../controllers/auth-controllers/authController";
const authRouter = express.Router();


authRouter.get("/login", AuthService.getLogIn);

authRouter.post("/login", AuthService.login);

authRouter.get("/register", AuthService.getRegister);

authRouter.post("/register", AuthService.signup);
//promjena u GET
authRouter.get("/logout", AuthService.logout);

authRouter.get("/confirm/:token", AuthService.confirmRegistration);

authRouter.get("/forgot-password", function (req, res) {
  res.render("auth/forgotPassword.ejs");
});

authRouter.post("/forgot-password", AuthService.forgotPassword);

authRouter.get("/reset-password/:id/:token", AuthService.getResetPassword);

authRouter.post("/reset-password/:id/:token", AuthService.resetPassword);

authRouter.get("/401", (req, res) => {
  res.render("shared/includes/401");
});
authRouter.get("/501", (req, res) => {
  res.render("shared/includes/501");
});

export default authRouter;
