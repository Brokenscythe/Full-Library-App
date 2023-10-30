import { Request, Response, NextFunction } from "express";
import Author from "../../models/authorModel";

export async function getAllAuthors(req: Request, res: Response, next: NextFunction) {
  try {
    const authors = await Author.getAllAuthors();
    res.render("autori/autori", { authors: authors });
  } catch (error) {
    return next(error);
  }
}

export async function getAuthor(req: Request, res: Response, next: NextFunction) {
  const authorId = parseInt(req.params.id);
  let author;
  try {
    author = await Author.getAuthor(authorId);
    console.log(author);
    res.render("autori/autorProfile", { authors: [author] });
  } catch (error) {
    return next(error);
  }
}

export async function getNewAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    res.render("autori/noviAutor");
  } catch (error) {
    return next(error);
  }
}
export async function getEditAuthor(req: Request, res: Response, next: NextFunction) {
  const authorId = parseInt(req.params.id);
  let author;
  try {
    author = await Author.getAuthor(authorId);
    res.render("autori/editAutor", { authors: [author] });
  } catch (error) {
    return next(error);
  }
}
export async function addAuthor(req: Request, res: Response, next: NextFunction) {
  const { imePrezimeAutor, opisAutor } = req.body;
  let author;
  try {
    author = new Author(imePrezimeAutor, "", opisAutor, "");
    await author.save();
    res.redirect("/authors");
  } catch (error) {
    return next(error);
  }
}

export async function updateAuthor(req: Request, res: Response, next: NextFunction) {
  const { imePrezimeAutor, opisAutor } = req.body;
  const authorId = parseInt(req.params.id);
  let author;
  try {
    const existingAuthor = await Author.getAuthor(authorId);
    author = new Author(imePrezimeAutor, "", opisAutor, "", existingAuthor.created_at, new Date(), authorId);
    await author.save();
    res.redirect("/authors");
  } catch (error) {
    return next(error);
  }
}

export async function deleteAuthor(req: Request, res: Response, next: NextFunction) {
  const authorId = parseInt(req.params.id);
  let author;
  try {
    author = new Author("", "", "", "", new Date(), new Date(), authorId);
    author.delete();
    res.redirect("/authors");
  } catch (error) {
    return next(error);
  }
}
