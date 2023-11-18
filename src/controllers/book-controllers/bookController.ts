import { Request, Response, NextFunction } from "express";
import Book from "../../models/bookModel";
import Author from "../../models/authorModel";
import Category from "../../models/categoryModel";
import Genre from "../../models/genreModel";
import Publisher from "../../models/publisherModel";
import Letter from "../../models/letterModel";
import Binding from "../../models/bindingModel";
import Format from "../../models/formatModel";

export async function getEditBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookId = parseInt(req.params.id.split(":")[0]);
    const book = await Book.getBook(bookId);
    const authors = await Author.getAllAuthors();
    const categories = await Category.getAllCategories();
    const genres = await Genre.getAllGenres();
    const publishers = await Publisher.getAllPublishers();
    const letters = await Letter.getAllLetters();
    const bindings = await Binding.getAllBindings();
    const formats = await Format.getAllFormats();
    res.render("knjige/editKnjiga", {
      book: book,
      authors: authors,
      categories: categories,
      genres: genres,
      publishers: publishers,
      letters: letters,
      bindings: bindings,
      formats: formats,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getAllBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await Book.getAllBooks();
    const authors = await Author.getAllAuthors();
    const categories = await Category.getAllCategories();
    res.render("knjige/evidencijaKnjiga", {
      books: books,
      authors: authors,
      categories: categories,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getBook(req: Request, res: Response, next: NextFunction) {
  const bookId = parseInt(req.params.id.split(":")[0]);
  try {
    const book = await Book.getBook(bookId);
    res.render("knjige/knjigaOsnovniDetalji", { book: book });
  } catch (error) {
    return next(error);
  }
}

export async function getBook1(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = parseInt(req.params.id.split(":")[0]);
  try {
    const book = await Book.getBook(bookId);
    res.render("knjige/knjigaSpecifikacija", { book: book });
  } catch (error) {
    return next(error);
  }
}

export async function addBook(req: Request, res: Response, next: NextFunction) {
  const book = new Book(
    req.body.title,
    req.body.pageCount,
    req.body.letterId,
    req.body.languageId,
    req.body.bindingId,
    req.body.formatId,
    req.body.publisherId,
    req.body.isbn,
    req.body.quantityCount,
    req.body.rentedCount,
    req.body.reservedCount,
    req.body.body,
    req.body.year,
    req.body.pdf,
    req.body.authors,
    req.body.categories,
    req.body.genres,
    req.body.galleries,
    req.body.reservations,
    req.body.rents
  );
  try {
    await book.save();
    await getAllBooks(req, res, next);
  } catch (error) {
    next(error);
  }
}

export async function getNewBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authors = await Author.getAllAuthors();
    const categories = await Category.getAllCategories();
    const genres = await Genre.getAllGenres();
    const publishers = await Publisher.getAllPublishers();
    const letters = await Letter.getAllLetters();
    const bindings = await Binding.getAllBindings();
    const formats = await Format.getAllFormats();
    res.render("knjige/novaKnjiga", {
      authors: authors,
      categories: categories,
      genres: genres,
      publishers: publishers,
      letters: letters,
      bindings: bindings,
      formats: formats,
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = parseInt(req.params.id.split(":")[0]);
  const book = new Book(
    req.body.title,
    req.body.pageCount,
    req.body.letterId,
    req.body.languageId,
    req.body.bindingId,
    req.body.formatId,
    req.body.publisherId,
    req.body.isbn,
    req.body.quantityCount,
    req.body.rentedCount,
    req.body.reservedCount,
    req.body.body,
    req.body.year,
    req.body.pdf,
    req.body.authors,
    req.body.categories,
    req.body.genres,
    req.body.galleries,
    req.body.reservations,
    req.body.rents,
    bookId
  );
  try {
    await book.save();
    res.render("knjige/evidencijaKnjiga");
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bookId = parseInt(req.params.id.split(":")[0]);
  try {
    Book.delete(bookId);
  } catch (error) {
    return next(error);
  }
  res.json({
    mesage: "Book deleted",
  });
}
