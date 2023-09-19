import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
// Models
import User from "../../models/userModel";
// Utils
import validation from "../../utils/validation";
import sessionFlash from "../../utils/session-flash";
// Interfaces
import UserData from "../../interfaces/userData";

const db = new PrismaClient();

export async function getRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let sessionData = sessionFlash.getSessionData(req);
    console.log(sessionData);
    if (!sessionData) {
      sessionData = {
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        JMBG: "",
      };
    }
    res.render("auth/register", { inputData: sessionData });
  } catch (error) {
    return next(error);
  }
}

export async function getLogIn(req: Request, res: Response): Promise<void> {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("auth/login", { inputData: sessionData });
}

export async function signup(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {
  try {
    const enteredData: UserData = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body["confirm_password"],
      JMBG: req.body.jmbg,
    };

    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      JMBG: req.body.jmbg,
    });

    const existsAlready = await newUser.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        { error_message: "User already exists! Please check your username and email!", ...enteredData },
        function () {
          res.redirect("/register");
        }
      );
      if (!validation.userDetailsAreValid(req.body.username, req.body.name, req.body.email, req.body.password)) {
        sessionFlash.flashDataToSession(
          req,
          {
            error_message: "Please check your input. Password must be at least 6 characters long and username 4!",
            ...enteredData,
          },
          function () {
            res.redirect("/signup");
          }
        );
        return;
      }
      if (!validation.passwordIsConfirmed(req.body.password, req.body["confirm_password"])) {
        sessionFlash.flashDataToSession(
          req,
          {
            error_message: "Please make sure your passwords match.",
            ...enteredData,
          },
          function () {
            res.redirect("/signup");
          }
        );
        return;
      }
    }
    await newUser.signup();
    res.redirect("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export async function login(req: Request, res: Response): Promise<void> {}
