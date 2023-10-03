import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as ReservationService from "../controllers/reservationController";

const ReservationRouter = express.Router();

// reservationRouter.get('/',  ReservationService.getAllReservations);
// // reservationRouter.get('/:id',  ReservationService.getReservation);
// reservationRouter.post('/',  ReservationService.createReservation);
// reservationRouter.patch('/:id',  ReservationService.updateReservation);
// reservationRouter.delete('/:id',  ReservationService.deleteReservation);
ReservationRouter.get("/aktivneRezervacije", (req, res) => {
  res.render("rezervacije/aktivneRezervacije");
});
ReservationRouter.get("/dashboard", (req, res) => {
  res.render("dashboard/dashboard");
});

///reservations/knjigePrekoracenje

ReservationRouter.get("/knjigePrekoracenje", (req, res) => {
  res.render("rezervacije/knjigePrekoracenje");
});

ReservationRouter.get("/arhiviraneRezervacije", (req, res) => {
  res.render("rezervacije/arhiviraneRezervacije");
});

// zamalo da zaboravim trazenje
ReservationRouter.get("/search", isLoggedIn, ReservationService.searchReservations);

export default ReservationRouter;
