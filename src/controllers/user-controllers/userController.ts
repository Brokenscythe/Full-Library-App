import { Request, Response, NextFunction } from "express";
import User from "../../models/userModel";
import validation from "../../utils/validation";
import sessionFlash from "../../utils/session-flash";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient

const db = new PrismaClient(); // Create a new instance of PrismaClient

export async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await User.getAllUsers();
    res.render("ucenici/ucenik", { users: users });
  } catch (error) {
    return next(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  let user;
  try {
    user = await User.getUser(userId);
    res.render("ucenici/ucenikProfile", { user: user });
  } catch (error) {
    return next(error);
  }
}

export async function getEditUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  console.log(userId);
  try {
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData) {
      sessionData = {
        name: "",
        JMBG: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      };
    }
    const userData = await User.getUser(userId);
    console.log(userData);
    res.render("ucenici/editUcenik", { user: userData, inputData: sessionData });
  } catch (error) {
    return next(error);
  }
}

export async function getNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    let sessionData = sessionFlash.getSessionData(req);
    if (!sessionData) {
      sessionData = {
        name: "",
        JMBG: " ",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      };
    }
    res.render("ucenici/noviUcenik", { inputData: sessionData });
  } catch (error) {
    return next(error);
  }
}

export async function updatePassword(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  const { pwResetUcenik } = req.body;
  try {
    await User.changePassword(userId, pwResetUcenik);
  } catch (error) {
    return next(error);
  }
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
  // Your code for adding a new user here
  // Make sure you update 'db' to use your PrismaClient instance

  // Example:
  const {
    imePrezimeUcenik,
    jmbgUcenik,
    emailUcenik,
    usernameUcenik,
    pwUcenik,
    pw2Ucenik,
    tipKorisnika,
  } = req.body;
  const filename = req.file?.filename;

  const enteredData = {
    name: imePrezimeUcenik,
    username: usernameUcenik,
    email: emailUcenik,
    password: pwUcenik,
    JMBG: jmbgUcenik,
    photo: filename,
  };

  if (!validation.passwordIsConfirmed(pwUcenik, pw2Ucenik)) {
    const errorMessage = "Please make sure your passwords match.";
    const flashData = {
      error_message: errorMessage,
      ...enteredData,
    };
    sessionFlash.flashDataToSession(req, flashData, function () {
      res.redirect("/noviUcenik");
    });
    return;
  }

  try {
    await db.user.create({
      data: {
        name: imePrezimeUcenik,
        username: usernameUcenik,
        email: emailUcenik,
        password: pwUcenik,
        JMBG: jmbgUcenik,
        typeId: tipKorisnika,
        photo: filename,
        created_at: new Date(),
        login_count: 0,
      },
    });

    res.redirect("/ucenik");
  } catch (error) {
    return next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  // Your code for updating a user here
  // Make sure you update 'db' to use your PrismaClient instance

  // Example:
  const userId = parseInt(req.params.id);
  const {
    imePrezimeUcenikEdit,
    jmbgUcenikEdit,
    emailUcenikEdit,
    usernameUcenikEdit,
    pwUcenikEdit,
    pw2UcenikEdit,
    tipKorisnika,
  } = req.body;
  const filename = req.file?.filename;

  const enteredData = {
    name: imePrezimeUcenikEdit,
    username: usernameUcenikEdit,
    email: emailUcenikEdit,
    password: pwUcenikEdit,
    JMBG: jmbgUcenikEdit,
    photo: filename,
  };

  if (!validation.passwordIsConfirmed(pwUcenikEdit, pw2UcenikEdit)) {
    sessionFlash.flashDataToSession(
      req,
      {
        error_message: "Please make sure your passwords match.",
        ...enteredData,
      },
      function () {
        res.redirect(`/editUcenik/${userId}`);
      }
    );
    return;
  }

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        name: imePrezimeUcenikEdit,
        username: usernameUcenikEdit,
        email: emailUcenikEdit,
        password: pwUcenikEdit,
        JMBG: jmbgUcenikEdit,
        typeId: tipKorisnika,
        photo: filename,
        updated_at: new Date(),
      },
    });

    res.redirect("/ucenik");
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);
  console.log("Deleting user with ID:", userId);
  let user;
  try {
    user = new User({ id: userId });
    await user.delete();
    console.log(user);
    res.redirect("/ucenik");
    console.log(`User with id ${userId} is deleted.`);
  } catch (error) {
    return next(error);
  }
}
