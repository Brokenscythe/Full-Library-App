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
