import express from "express";
import * as BookController from "../controllers/book-controllers/bookController";
import { getBook, getAllBooks, deleteBook, updateBook, addBook, rentBook} from "../controllers/book-controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", BookController.addBook);
bookRouter.patch("/:id", BookController.updateBook);
bookRouter.delete("/:id", BookController.deleteBook);

bookRouter.get("/details/:id", BookController.getBookDetails);

export default bookRouter;
