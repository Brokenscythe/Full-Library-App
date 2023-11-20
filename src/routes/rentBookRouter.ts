import express from "express";
import rentBookController from "../controllers/rent-controllers/rentBookController";

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

router.get('/rent/display/:bookId', rentBookController.displayBookDetails);

router.get("/rent", rentBookController.viewRentedBooksByStatusID);

//vrati knjigu

router.post('/rent/returnRentedBook/:bookId', rentBookController.returnRentedBook);
router.get('/rent/returnRentedBook/:bookId', rentBookController.returnRentedBook);

//detalji iydavanja

router.get('/rent/details/:rentId', rentBookController.rentBookDetails);
// istorija

router.get('/rent/history/:bookId', rentBookController.historyOfRentingByBookId);
export default router;
