import express from "express";
import * as AuthorController from "../controllers/author-controllers/authorController";

const AuthorRouter = express.Router();

AuthorRouter.get("/", AuthorController.getAllAuthors);
AuthorRouter.get("/new-author", AuthorController.getNewAuthor);
AuthorRouter.get("/autorProfile/:id", AuthorController.getAuthor);
AuthorRouter.get("/editAutor/:id", AuthorController.getEditAuthor);

AuthorRouter.post("/new-author", AuthorController.addAuthor);
AuthorRouter.post("/editAutor/:id", AuthorController.updateAuthor);
AuthorRouter.delete("/deleteAutor/:id", AuthorController.deleteAuthor);

export default AuthorRouter;
