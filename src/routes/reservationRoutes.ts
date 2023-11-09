import express from "express";
import reservationController from "../controllers/reservationController";

const router = express.Router();

// Kreiraj rezervaciju
router.post("/reservations", reservationController.createReservation);

// Pročitajte sve rezervacije
router.get("/reservations", reservationController.getAllReservations);
router.get("/reservations-add", reservationController.createReservationForm);

// Pročitaj pojedinacnu rezervaciju
router.get("/reservations/:reservationId", reservationController.getReservationById);

// Pročitajte pojedinačnu rezervaciju
router.put("/reservations/:reservationId", reservationController.updateReservation);

// Obrišite rezervaciju
router.delete("/reservations/:reservationId", reservationController.deleteReservation);

// Ruta za pretragu rezervacija po naslovu knjige
router.get("/reservations/search/book", reservationController.searchReservationsByBookTitle);

// Dodaj rutu za pretragu rezervacija po imenu korisnika
router.get("/reservations/search/user", reservationController.searchReservationsByUserName);

// Pročitajte arhivirane rezervacije
router.get("/reservations/archived/all", reservationController.getArchivedReservations);

export default router;
