/* import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as BookController from "../controllers/book-controllers/bookController";
//import { getBook, getAllBooks, deleteBook, updateBook, addBook } from "../controllers/bookController"; koment

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
//bookRouter.get("/:id", BookController.getBook); komen
bookRouter.post("/", BookController.addBook);
bookRouter.patch("/:id", BookController.updateBook); // You can use 'patch' for updating as well
bookRouter.delete("/:id", BookController.deleteBook);

export default bookRouter; */


import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as BookController from "../controllers/book-controllers/bookController";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const bookRouter = express.Router();
bookRouter.get('/add', async (req, res) => {
    try {
      const authors = await prisma.author.findMany();
      const publishers = await prisma.publisher.findMany();
      const format = await prisma.format.findMany();
      const povez = await prisma.binding.findMany();
      const slovo = await prisma.letter.findMany();
      const jezik = await prisma.language.findMany();
      // ostali podaci iz baze 
  
      res.render('knjige/novaKnjiga', { authors, publishers, format, povez, slovo, jezik});
    } catch (err) {
      console.error(err);
      res.status(500).send('Greska na serveru-book rute');
    }
  });
bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", BookController.addBook);
bookRouter.patch("/:id", BookController.updateBook); //moze i patch umjesto update
bookRouter.delete("/:id", BookController.deleteBook);


export default bookRouter;
