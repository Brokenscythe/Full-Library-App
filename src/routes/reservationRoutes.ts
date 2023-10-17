import express from "express";
import { isLoggedIn } from "../utils/passport";
import * as ReservationService from "../controllers/reservationController";
import { getAllReservations,getReservation,rezervisiKnjigu,createReservation} from "../controllers/reservationController";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
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
  res.render("knjige/knjigePrekoracenje");
});

reservationRouter.get("/arhiviraneRezervacije", (req, res) => {
  res.render("rezervacije/arhiviraneRezervacije");
});

reservationRouter.get("/rezervisiKnjigu", rezervisiKnjigu);
reservationRouter.post("/createReservation", createReservation);


// zamalo da zaboravim trazenje
reservationRouter.get("/search", isLoggedIn, ReservationService.searchReservations);

export default reservationRouter;
