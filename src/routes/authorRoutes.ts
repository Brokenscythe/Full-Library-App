import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as AuthorController from "../controllers/authorController";
import { Request, Response, NextFunction } from "express";
import { getAuthor, getAllAuthors, deleteAuthor, updateAuthor, addAuthor } from "../controllers/authorController";

const AuthorRouter = express.Router();

AuthorRouter.get("/", AuthorController.getAllAuthors);
AuthorRouter.get("/:id", AuthorController.getAuthor);
AuthorRouter.get("/new-author", isLoggedIn, (req: Request, res: Response) => {
  res.render("autori/noviAutor");
});
AuthorRouter.get("/edit-author", (req: Request, res: Response) => {
  res.render("autori/editAutor"); //mora da se prebaci u kontroler i da se ubace inf koje već postoje o autoru
});
AuthorRouter.post("/", isLoggedIn, AuthorController.addAuthor);
AuthorRouter.patch("/:id", isLoggedIn, AuthorController.updateAuthor); // You can use 'patch' for updating as well
AuthorRouter.delete("delete/:id", isLoggedIn, AuthorController.deleteAuthor);

// middleware koji omogućava da se šalje delete request preko linka
AuthorRouter.use(function (req, res, next) {
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});

export default AuthorRouter;
