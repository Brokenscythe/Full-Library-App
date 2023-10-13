import { Request, Response, NextFunction } from "express";
import Letter from "../../models/letterModel";

export async function getAllletters(req: Request, res: Response, next: NextFunction) {
  try {
    const letters = await Letter.getAllLetters();
    console.log(letters);
    res.render("settings/settingsPismo", { letters: letters });
  } catch (error) {
    return next(error);
  }
}

export async function getLetter(req: Request, res: Response, next: NextFunction) {
  const letterId = parseInt(req.params.id);
  let letter;
  try {
    letter = await Letter.getLetter(letterId);
    console.log(letter);
    res.render("pismo/editPismo", { letter: letter });
  } catch (error) {
    return next(error);
  }
}
export async function getNewLetter(req: Request, res: Response) {
  res.render("pismo/novoPismo");
}

export async function addLetter(req: Request, res: Response, next: NextFunction) {
  const name = req.body.letter.toString();
  let letter;
  try {
    letter = new Letter(name);
    await letter.save();
    res.redirect("/settingsPismo");
  } catch (error) {
    return next(error);
  }
}

export async function updateLetter(req: Request, res: Response, next: NextFunction) {
  const letterId = parseInt(req.params.id);
  const name = req.body.letter.toString();
  console.log(letterId);
  console.log(name);
  try {
    const letter = new Letter(name, letterId);
    await letter.save();
    res.redirect("/settingsPismo");
  } catch (error) {
    return next(error);
  }
}

export async function deleteLetter(req: Request, res: Response, next: NextFunction) {
  const letterId = parseInt(req.params.id);
  console.log("Deleting letter with ID:", letterId);
  try {
    const letter = new Letter("", letterId);
    await letter.delete();
    console.log("Letter deleted successfully");
    res.redirect("/settingsPismo");
  } catch (error) {
    return next(error);
  }
}
