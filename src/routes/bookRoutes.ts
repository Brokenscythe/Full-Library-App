import express from "express";
import * as BookController from "../controllers/bookController";

import * as AuthorController from "../controllers/authorController";
import * as BindingController from "../controllers/bindingController";
import * as CategoryController from "../controllers/categoryController";
import * as FormatController from "../controllers/formatController";
import * as GenreController from "../controllers/genreController";
import * as LetterController from "../controllers/letterController";
import * as PublisherController from "../controllers/publisherController";

const bookRouter = express.Router();

bookRouter.get("/editKnjiga/:id", (req, res, next) => {
  const book = BookController.getBook(req, res, next);
  /*const authors = AuthorController.getAllAuthors(req,res,next);
    const categories = CategoryController.getAllCategories(req, res, next);
    const genres = GenreController.getAllGenres(req,res,next);
    const publishers = PublisherController.getAllPublishers(req,res,next);
    res.render('knjige/editKnjiga', {book: book, authors:authors, categories:categories, genres:genres, publishers:publishers}); */
  res.render("knjige/editKnjiga", { book: book });
});
bookRouter.get("/editKnjigaMultimedija/:id", (req, res, next) => {
  const book = BookController.getBook(req, res, next);
  res.render("knjige/editKnjigaMultimedija", { book: book });
});
bookRouter.get("/editKnjigaSpecifikacija/:id", (req, res, next) => {
  const book = BookController.getBook(req, res, next);
  const bindings = BindingController.getAllbindings(req, res, next);
  const formats = FormatController.getAllFormats(req, res, next);
  const letters = LetterController.getAllletters(req, res, next);
  res.render("knjige/editKnjigaSpecifikacija", {
    book: book,
    bindings: bindings,
    formats: formats,
    letters: letters,
  });
});
bookRouter.get("/evidencijaKnjiga", BookController.getAllBooks);

// šta je ovo?
bookRouter.get("/evidencijaKnjigaMultimedija", (req, res) => {
  res.render("knjige/evidencijaKnjigaMultimedija");
});

bookRouter.get("/knjigaOsnovniDetalji/:id", (req, res, next) => {
  const book = BookController.getBook(req, res, next);
  res.render("knjige/knjigaOsnovniDetalji", { book: book });
});
bookRouter.get("/knjigaSpecifikacija/:id", (req, res, next) => {
  const book = BookController.getBook(req, res, next);
  res.render("knjige/knjigaSpecifikacija", { book: book });
});
bookRouter.get("/knjigePrekoracenje", (req, res) => {
  res.render("knjige/knjigePrekoracenje");
});
bookRouter.get("/novaKnjiga", (req, res, next) => {
  const authors = AuthorController.getAllAuthors(req, res, next);
  const categories = CategoryController.getAllCategories(req, res, next);
  const genres = GenreController.getAllGenres(req, res, next);
  const publishers = PublisherController.getAllPublishers(req, res, next);
  const bindings = BindingController.getAllbindings(req, res, next);
  const formats = FormatController.getAllFormats(req, res, next);
  const letters = LetterController.getAllletters(req, res, next);
  res.render("knjige/novaKnjiga", {
    authors: authors,
    categories: categories,
    genres: genres,
    publishers: publishers,
    bindings: bindings,
    formats: formats,
    letters: letters,
  });
});

/////
bookRouter.get("/vraceneKnjige", (req, res) => {
  res.render("knjige/vraceneKnjige");
});
bookRouter.get("/vratiKnjigu", (req, res) => {
  res.render("knjige/vratiKnjigu");
});
/////

bookRouter.post("/editKnjiga/:id", BookController.updateBook);
bookRouter.post("/editKnjigaMultimedija/:id", BookController.updateBook);
bookRouter.post("/editKnjigaSpecifikacija/:id", BookController.updateBook);

bookRouter.post("/novaKnjiga", BookController.addBook);
bookRouter.post("/novaKnjigaMultimedija", BookController.addBook);
bookRouter.post("/novaKnjigaSpecifikacija", BookController.addBook);

bookRouter.delete("/deleteBook/:id", BookController.deleteBook);
import express from "express";
import * as BookController from "../controllers/book-controllers/bookController";
import { getBook, getAllBooks, deleteBook, updateBook, addBook } from "../controllers/book-controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", BookController.addBook);
bookRouter.patch("/:id", BookController.updateBook);
bookRouter.delete("/:id", BookController.deleteBook);

export default bookRouter;
