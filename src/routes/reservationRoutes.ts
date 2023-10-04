import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as ReservationService from "../controllers/reservationController";
import { getAllReservations, getReservation } from "../controllers/reservationController";
const reservationRouter = express.Router();

// reservationRouter.get('/',  ReservationService.getAllReservations);
// // reservationRouter.get('/:id',  ReservationService.getReservation);
// reservationRouter.post('/',  ReservationService.createReservation);
// reservationRouter.patch('/:id',  ReservationService.updateReservation);
// reservationRouter.delete('/:id',  ReservationService.deleteReservation);
reservationRouter.get("/aktivneRezervacije", getAllReservations);
reservationRouter.get("/reservation/:id", getReservation);

reservationRouter.get("/dashboard", (req, res) => {
  res.render("dashboard/dashboard");
});

///reservations/knjigePrekoracenje

reservationRouter.get("/knjigePrekoracenje", (req, res) => {
  res.render("rezervacije/knjigePrekoracenje");
});

reservationRouter.get("/arhiviraneRezervacije", (req, res) => {
  res.render("rezervacije/arhiviraneRezervacije");
});

// zamalo da zaboravim trazenje
reservationRouter.get("/search", isLoggedIn, ReservationService.searchReservations);

export default reservationRouter;
