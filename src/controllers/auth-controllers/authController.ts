import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
// Models
import User from "../../models/userModel";
import UserLoginsService from "../../models/userLogins";
// Utils
import authUtil from "../../utils/authentication";
import validation from "../../utils/validation";
import sessionFlash from "../../utils/session-flash";
// Interfaces
import { UserData } from "../../interfaces/userData";
//Email-Confirmation
import transport from "../../utils/email";

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

export async function signup(req: Request, res: Response): Promise<void | Response<never, Record<string, number>>> {
  const enteredData: UserData = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body["confirm_password"],
    JMBG: req.body.jmbg,
  };
  const confirmationToken = uuidv4();
  console.log(enteredData);
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    JMBG: req.body.jmbg,
    confirmation_token: confirmationToken,
    created_at: new Date(),
    updated_at: new Date(),
  });
  try {
    const existsAlready = await newUser.existsAlready();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        { error_message: "User already exists! Please check your username,email and JMBG!", ...enteredData },
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
    await newUser.save();
    const confirmationLink = `http://localhost:3000/confirm/${confirmationToken}`;
    await transport.sendMail({
      from: "cortexprojectlibrary@gmail.com",
      to: newUser.email,
      subject: "Potvrdi svoju registraciju.",
      html: `
        <h1 style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 24px; text-align: center;">Provjera sigurnosti</h1>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Poštovani ${newUser.name},</p>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Da biste potvrdili svoju registraciju, pritisnite na sledeći link:</p>
        <a href="${confirmationLink}" style="font-family: 'Helvetica Neue', sans-serif; color: #007BFF; font-size: 16px; text-decoration: none; display: block; text-align: center;">Pritisnite ovdje da potvrdite registraciju</a>
      `,
    });

    console.log("Registration successful. Confirmation email sent.");
  } catch (error) {
    console.error("Error during registartion:", error);
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
  } else {
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
    } else {
      const passwordIsCorrect = await checkUser.hasMatchingPassword(existingUser.password);
      if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
          res.redirect("/login");
        });
      } else {
        try {
          await UserLoginsService.logLoginAttempt(existingUser.id);
          await User.updateLoginCount(existingUser.id);
          await User.updateLastLoginAt(existingUser.id);

          authUtil.createUserSession(req, existingUser, function () {
            res.redirect("/");
          });
        } catch (error) {
          console.error("Error during login:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }
  }
}
export async function getForgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try{
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData) {
      sessionData = {
        email: ""
      };
    }
    res.render("auth/forgotPassword.ejs", { inputData: sessionData });
  }catch(error){
    return next(error)
  }
}
export async function forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email } = req.body;
  
  try {
    const user = new User({ email: email });
    const existingUser = await user.hasMatchingEmail();
  
        if (!existingUser){
        sessionFlash.flashDataToSession(req, 
          {
            error_message: "Nismo mogli pronaći korisnika sa tim e-mailom.",
            ...email
          }, function(){
            res.redirect('/forgot-password')
          })
          return
        }
      console.log("User with provided email has been found");
      try{
      const secret = process.env.PASS_SECRET + existingUser.password
      const payload = {
        email: existingUser.email,
        id: existingUser.id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:3000/reset-password/${existingUser.id}/${token}`;

      await transport.sendMail({
        from: "cortexprojectlibrary@gmail.com",
        to: existingUser.email,
        subject: "Promjena lozinke",
        html: `
        <h1 style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 24px; text-align: center;">Promjena Lozinke</h1>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Poštovani ${existingUser.name},</p>
        <p style="font-family: 'Helvetica Neue', sans-serif; color: #333; font-size: 16px; text-align: center; margin: 10px 0;">Da biste promijenili svoju lozinku, pritisnite na sledeći link:</p>
        <a href="${link}" style="font-family: 'Helvetica Neue', sans-serif; color: #007BFF; font-size: 16px; text-decoration: none; display: block; text-align: center;">Pritisnite ovdje da promjenite lozinku</a>
        `,
      });
      console.log('Email sent to the client')
    }catch(emailError){
      console.error("Error sending email:", emailError);
      sessionFlash.flashDataToSession(req, {
        error_message: "Error sending email. Please try again later.",
        ...email,
      }, function () {
        res.redirect('/forgot-password');
      });
      return;
    }
    sessionFlash.flashDataToSession(req, 
      {
          successful_message: `E-mail sa linkom za promjenu lozinke je poslat na ${existingUser.email}.`,
          ...email
        }, function(){
          res.redirect('/forgot-password')
        });
        return;
      }catch (error) {
    return next(error);
}
}

export async function getResetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id, token } = req.params;
  console.log(token)
  console.log(`This is ${id} extracted, this is ${token} extracted from req.params`)
  let errorData = sessionFlash.getSessionData(req);
  if (!errorData) {
    errorData = {
      error_message: ""
    };
  }
  try {
    const existingUser = await User.hasMatchingId(Number(id));
    if (!existingUser) {
      res.send("Invalid id...");
      console.log("User with that id isn't found");
      return;
    }
    const secret = process.env.PASS_SECRET + existingUser.password;
    console.log(`Token during verification: ${token}`);
      console.log(`Secret during verification: ${secret}`);
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        console.error("Error verifying token:", err);
        return next(err);
      }
      
      console.log("Token verification successful");
      res.render("auth/reset-password", { user: existingUser, inputData: errorData });
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return next(error);
  }
}


export async function resetPassword(req: Request, res: Response,next: NextFunction): Promise<void> {
  const { id, token } = req.params;
  const {password, password2} = req.body
  let newPasswordUser;
  try{
    newPasswordUser = new User({id: Number(id)});
    const existingUser = await User.hasMatchingId(Number(id));
      const link = `http://localhost:3000/reset-password/${existingUser.id}/${token}`;
      if(!validation.passwordIsConfirmed(password, password2)){
        sessionFlash.flashDataToSession(
          req,
          {
            error_message: "Upozorenje, lozinke se ne poklapaju!",
          },
          function () {
            res.redirect(`${link}`);
          }
        );
        return;
      }
      await newPasswordUser .save({
        id: id,
        password: password,
      })
      res.redirect('/login')
      console.log('Uspjesno promjenjena lozinka na korisnika')
  }catch(error){
    return next(error);
  }
}

export async function confirmRegistration(req: Request, res: Response): Promise<void> {
  const token = req.params.token;
  try {
    console.log(token);
    await User.findUserToken(token);
    res.redirect("/login");
  } catch (error) {
    console.error("Error during confirmation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  authUtil.destroyUserSession(req, res);
}
