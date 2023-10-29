import express from "express";
import rentBookController from "../controllers/rentBookController";

const router = express.Router();

// NOVO IZNAJMLJIVANJE
router.post("/rent", rentBookController.rentBook);

// Update iznajmljivanje sa rentStatusId
router.put("/rent/:id", rentBookController.updateRentBook);

// Pronadji sve dostupne knjige za iznajmljivanje
router.get("/available-books", rentBookController.displayAvailableBooks);

// Pretraga iznajmljenih knjiga po naslovu
router.get("/search-rented-books", rentBookController.searchRentedBooks);

// Pretraga iznajmljenih knjiga po rentStatusId
router.get("/search-rented-books-status", rentBookController.searchRentedBooksStatus);

export default router;
