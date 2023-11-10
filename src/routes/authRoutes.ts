import express from "express";
import * as AuthService from "../controllers/auth-controllers/authController";
import sessionFlash from "../utils/session-flash";
const authRouter = express.Router();

authRouter.get("/login", AuthService.getLogIn);

authRouter.post("/login", AuthService.login);

authRouter.get("/register", AuthService.getRegister);

authRouter.post("/register", AuthService.signup);

authRouter.post("/logout", AuthService.logout);

authRouter.get("/confirm/:token", AuthService.confirmRegistration);

authRouter.get("/forgot-password", AuthService.getForgotPassword);

authRouter.post("/forgot-password", AuthService.forgotPassword);

authRouter.get("/reset-password/:id/:token", AuthService.getResetPassword);

authRouter.post("/reset-password/:id/:token", AuthService.resetPassword);

authRouter.get("/401", (req, res, next) => {
    res.render("shared/includes/401");
});
authRouter.get("/501", (req, res) => {
  res.render("shared/includes/501");
});

export default authRouter;
