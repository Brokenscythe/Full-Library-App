import express from "express";
import * as AuthorController from "../controllers/authorController";
import { Request, Response, NextFunction } from "express";
//import { getAuthor, getAllAuthors, deleteAuthor, updateAuthor, addAuthor } from "../controllers/authorController";

const AuthorRouter = express.Router();

AuthorRouter.get("/", AuthorController.getAllAuthors);
//uthorRouter.get("/:id", AuthorController.getAuthor);
AuthorRouter.get("/new-author", (req: Request, res: Response) => {
  res.render("autori/noviAutor");
});
AuthorRouter.get("/edit-author", (req: Request, res: Response) => {
  res.render("autori/editAutor"); //mora da se prebaci u kontroler i da se ubace inf koje već postoje o autoru
});
AuthorRouter.post("/", AuthorController.addAuthor);
AuthorRouter.patch("/:id", AuthorController.updateAuthor); // You can use 'patch' for updating as well
AuthorRouter.delete("delete/:id", AuthorController.deleteAuthor);

// middleware koji omogućava da se šalje delete request preko linka
AuthorRouter.use(function (req, res, next) {
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});

export default AuthorRouter;
