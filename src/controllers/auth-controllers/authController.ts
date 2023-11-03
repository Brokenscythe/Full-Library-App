import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../../models/userModel";
import UserLoginsService from "../../models/userLogins";
import authUtil from "../../utils/authentication";
import validation from "../../utils/validation";
import sessionFlash from "../../utils/session-flash";

export async function getRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let sessionData = sessionFlash.getSessionData(req);
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

export async function getLogIn(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData) {
      sessionData = {
        email: "",
        password: "",
      };
    }
    res.render("auth/login", { inputData: sessionData });
  } catch (error) {
    return next(error);
  }
}

export async function signup(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {
  const enteredData = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body["confirm_password"],
    JMBG: req.body.jmbg,
  };

  const newUser = new User(enteredData);
  try {
    const existsAlready = await newUser.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        { error_message: "User already exists! Please check your username, email, and JMBG!", ...enteredData },
        function () {
          res.redirect("/register");
        }
      );
      return;
    }
    if (!validation.userDetailsAreValid(req.body.username, req.body.name, req.body.email, req.body.password)) {
      sessionFlash.flashDataToSession(
        req,
        {
          error_message: "Please check your input. Password must be at least 6 characters long and username 4!",
          ...enteredData,
        },
        function () {
          res.redirect("/register");
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
          res.redirect("/register");
        }
      );
      return;
    }
    await newUser.register();
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  res.redirect("/login");
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    sessionFlash.flashDataToSession(req, { error_message: "Email and password are required." }, function () {
      res.redirect("/login");
    });
    return;
  }
  const checkUser = new User({ email, password });
  let existingUser;
  try {
    existingUser = await checkUser.hasMatchingEmail();
  } catch (error) {
    return next(error);
  }

  const sessionErrorData = {
    error_message: "Invalid credentials, please check your email and password!",
    email: email,
    password: password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordIsCorrect = await checkUser.hasMatchingPassword(existingUser.password);

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect("dashboard");
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, async function () {
    try {
      await UserLoginsService.logLoginAttempt(existingUser.id);
    } catch (error) {
      console.error("Error logging login attempt:", error);
    }

    res.redirect("/");
  });
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  authUtil.destroyUserSession(req, res);
}
