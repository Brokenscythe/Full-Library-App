import { Request, Response, NextFunction } from "express";
import Genre from "../../models/genreModel";

export async function getAllGenres(req: Request, res: Response, next: NextFunction) {
  try {
    const genres = await Genre.getAllGenres();
    console.log(genres);
    res.render("settings/settingsZanrovi", { genres: genres });
  } catch (error) {
    return next(error);
  }
}

export async function getGenre(req: Request, res: Response, next: NextFunction) {
  const genreId = parseInt(req.params.id.split(":")[1]);
  let genre;
  try {
    genre = await Genre.getGenre(genreId);
    res.render("zanrovi/editZanr", { genre: genre });
  } catch (error) {
    return next(error);
  }
}
export async function getNewGenre(req: Request, res: Response) {
  res.render("zanrovi/noviZanr");
}
export async function addGenre(req: Request, res: Response, next: NextFunction) {
  const name = req.body.genre.toString();
  let genre;
  try {
    genre = new Genre(name);
    await genre.save();
    res.redirect("/settingsZanrovi");
  } catch (error) {
    return next(error);
  }
}

export async function updateGenre(req: Request, res: Response, next: NextFunction) {
  const genreId = parseInt(req.params.id);
  const name = req.body.genre.toString();
  console.log(genreId);
  console.log(name);
  try {
    const genre = new Genre(name, genreId);
    await genre.save();
    res.redirect("/settingsZanrovi");
  } catch (error) {
    return next(error);
  }
}

export async function deleteGenre(req: Request, res: Response, next: NextFunction) {
  const genreId = parseInt(req.params.id);
  console.log("Deleting genre with ID:", genreId);
  try {
    const genre = new Genre("", genreId);
    await genre.delete();
    res.redirect("/settingsZanrovi");
  } catch (error) {
    return next(error);
  }
}
