import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as BookController from "../controllers/book-controllers/bookController";
//import { getBook, getAllBooks, deleteBook, updateBook, addBook } from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
//bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", BookController.addBook);
bookRouter.patch("/:id", BookController.updateBook); // You can use 'patch' for updating as well
bookRouter.delete("/:id", BookController.deleteBook);

export default bookRouter;
