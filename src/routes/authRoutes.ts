import express from "express";
import * as AuthService from "../controllers/auth-controllers/authController";
const authRouter = express.Router();

authRouter.get("/login", AuthService.getLogIn);

authRouter.post("/login", AuthService.login);

authRouter.get("/register", AuthService.getRegister);

authRouter.post("/register", AuthService.signup);

authRouter.post("/logout", AuthService.logout);

authRouter.get("/confirm/:token", AuthService.confirmRegistration);

export default authRouter;
