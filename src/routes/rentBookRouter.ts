import express from "express";
import rentBookController from "../controllers/rentBookController";

const router = express.Router();

// NOVO IZNAJMLJIVANJE
router.post("/rent", rentBookController.rentBook);
router.get("/rent", rentBookController.viewRentedBooksByStatus);

// Update iznajmljivanje sa rentStatusId
router.put("/rent/:id", rentBookController.updateRentBook);

// Pronadji sve dostupne knjige za iznajmljivanje
router.get("/available-books", rentBookController.displayAvailableBooks);

// Pretraga iznajmljenih knjiga po naslovu
router.get("/search-rented-books", rentBookController.searchRentedBooks);

// Pretraga iznajmljenih knjiga po rentStatusId
router.get("/search-rented-books-status", rentBookController.searchRentedBooksStatus);
//http://localhost:3000/search-rented-books-status?rentStatusId=2
export default router;
