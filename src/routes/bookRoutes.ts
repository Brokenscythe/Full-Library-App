import express from "express";
import * as BookController from "../controllers/book-controllers/bookController";
import { getBook, getAllBooks, deleteBook, updateBook, getAuthorDetails,addBookForm,addBook, rentBook} from "../controllers/book-controllers/bookController";

const bookRouter = express.Router();
bookRouter.get("/add", BookController.addBookForm);
bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);

bookRouter.post("/", BookController.addBook);

bookRouter.patch("/:id", BookController.updateBook);
bookRouter.delete("/:id", BookController.deleteBook);

bookRouter.get("/details/:id", BookController.getBookDetails);
bookRouter.get('/:authorId/details', getAuthorDetails);


export default bookRouter;
