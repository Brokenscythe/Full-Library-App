import express from "express";
import * as librarianService from "../controllers/librarian-controllers/librarianController";
const librarianRouter = express.Router();
import configuredMulterMiddleware from "../middlewares/image-upload";

librarianRouter.get("/bibliotekari", librarianService.getAllLibrarians);

librarianRouter.get("/editBibliotekar/:id", librarianService.getEditLibrarian);

librarianRouter.get("/bibliotekarProfile/:id", librarianService.getLibrarian);

librarianRouter.get("/noviBibliotekar", librarianService.getNewLibrarian);

librarianRouter.post("/noviBibliotekar", configuredMulterMiddleware, librarianService.addLibrarian);

librarianRouter.post("/editBibliotekar/:id", configuredMulterMiddleware, librarianService.updateLibrarian);

librarianRouter.post("/bibliotekarProfile/:id", librarianService.updatePassword);

librarianRouter.delete("/deleteBibliotekar/:id", librarianService.deleteLibrarian);

export default librarianRouter;
