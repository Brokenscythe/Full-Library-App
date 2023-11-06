import { Request, Response, NextFunction } from "express";
//Models
import Librarian from "../../models/librarianModel";
//Validation
import validation from "../../utils/validation";
import sessionFlash from "../../utils/session-flash";

export async function getAllLibrarians(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const librarians = await Librarian.getAllLibrarians();
    res.render("bibliotekari/bibliotekari", { librarians: librarians });
  } catch (error) {
    return next(error);
  }
}
export async function getLibrarian(req: Request, res: Response, next: NextFunction) {
  const librarianId = parseInt(req.params.id);
  let librarian;
  try {
    librarian = await Librarian.getLibrarian(librarianId);
    res.render("bibliotekari/bibliotekarProfile", { librarian: librarian });
  } catch (error) {
    return next(error);
  }
}

export async function getEditLibrarian(req: Request, res: Response, next: NextFunction) {
  const librarianId = parseInt(req.params.id);
  console.log(librarianId);
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
    const librarianData = await Librarian.getLibrarian(librarianId);
    console.log(librarianData);
    res.render("bibliotekari/editBibliotekar", { librarian: librarianData, inputData: sessionData });
  } catch (error) {
    return next(error);
  }
}
export async function getNewLibrarian(req: Request, res: Response, next: NextFunction) {
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
    res.render("bibliotekari/noviBibliotekar", { inputData: sessionData });
  } catch (error) {
    return next(error);
  }
}
export async function updatePassword(req: Request, res: Response, next: NextFunction) {
  const librarianId = parseInt(req.params.id);
  const { pwResetBibliotekar, pw2ResetBibliotekar } = req.body;
  console.log(pwResetBibliotekar, pw2ResetBibliotekar)
  try {
    return await Librarian.changePassword(librarianId, pwResetBibliotekar);
  } catch (error) {
    return next(error);
  }
}

export async function addLibrarian(req: Request, res: Response, next: NextFunction) {
  const {
    imePrezimeBibliotekar,
    jmbgBibliotekar,
    emailBibliotekar,
    usernameBibliotekar,
    pwBibliotekar,
    pw2Bibliotekar,
  } = req.body;
  const tipKorisnika = req.body.tipKorisnika;
  const filename = req.file?.filename;
  const enteredData = {
    name: imePrezimeBibliotekar,
    username: usernameBibliotekar,
    email: emailBibliotekar,
    password: pwBibliotekar,
    JMBG: jmbgBibliotekar,
    photo: filename,
  };
  if (!validation.passwordIsConfirmed(pwBibliotekar, pw2Bibliotekar)) {
    const errorMessage = "Please make sure your passwords match.";
    const flashData = {
      error_message: errorMessage,
      ...enteredData,
    };
    sessionFlash.flashDataToSession(req, flashData, function () {
      res.redirect("/noviBibliotekar");
    });
    return;
  }

  try {
    const user = new Librarian({
      name: imePrezimeBibliotekar,
      username: usernameBibliotekar,
      email: emailBibliotekar,
      password: pwBibliotekar,
      JMBG: jmbgBibliotekar,
      typeId: tipKorisnika,
      photo: filename,
    });
    await user.save();
    res.redirect("/bibliotekari");
  } catch (error) {
    return next(error);
  }
}
export async function updateLibrarian(req: Request, res: Response, next: NextFunction) {
  const librarianId = parseInt(req.params.id);
  const {
    imePrezimeBibliotekarEdit,
    jmbgBibliotekarEdit,
    emailBibliotekarEdit,
    usernameBibliotekarEdit,
    pwBibliotekarEdit,
    pw2BibliotekarEdit,
  } = req.body;
  const tipKorisnika = req.body.tipKorisnika;
  const filename = req.file?.filename;
  const enteredData = {
    name: imePrezimeBibliotekarEdit,
    username: usernameBibliotekarEdit,
    email: emailBibliotekarEdit,
    password: pwBibliotekarEdit,
    JMBG: jmbgBibliotekarEdit,
    photo: filename,
  };
  if (!validation.passwordIsConfirmed(pwBibliotekarEdit, pw2BibliotekarEdit)) {
    sessionFlash.flashDataToSession(
      req,
      {
        error_message: "Please make sure your passwords match.",
        ...enteredData,
      },
      function () {
        res.redirect(`/editBibliotekar/${librarianId}`);
      }
    );
    return;
  }
  try {
    const user = new Librarian({
      name: imePrezimeBibliotekarEdit,
      username: usernameBibliotekarEdit,
      email: emailBibliotekarEdit,
      password: pwBibliotekarEdit,
      JMBG: jmbgBibliotekarEdit,
      typeId: tipKorisnika,
      photo: filename,
      id: librarianId,
    });
    console.log(req.file);
    await user.save();
    res.redirect("/bibliotekari");
  } catch (error) {
    return next(error);
  }
}

export async function deleteLibrarian(req: Request, res: Response, next: NextFunction) {
  const librarianId = parseInt(req.params.id);
  console.log("Deleting librarian with ID:", librarianId);
  let librarian;
  try {
    librarian = new Librarian({ id: librarianId });
    await librarian.delete();
    console.log(librarian);
    res.redirect("/bibliotekari");
    console.log(`Librarian with id ${librarianId} is deleted.`);
  } catch (error) {
    return next(error);
  }
}
