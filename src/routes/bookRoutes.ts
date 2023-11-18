import express from "express";
import * as BookController from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/editKnjiga/:id", BookController.getEditBook);

bookRouter.get("/evidencijaKnjiga", BookController.getAllBooks);

bookRouter.get("/knjigaOsnovniDetalji/:id", BookController.getBook);

bookRouter.get("/knjigaSpecifikacija/:id", BookController.getBook1);

bookRouter.get("/novaKnjiga", BookController.getNewBook);

bookRouter.post("/editKnjiga/:id", BookController.updateBook);

bookRouter.post("/novaKnjiga", BookController.addBook);

bookRouter.delete("/deleteBook/:id", BookController.deleteBook);

export default bookRouter;
