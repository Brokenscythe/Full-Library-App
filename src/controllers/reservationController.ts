import { Request, Response, NextFunction } from "express";
import BookReservation from "../models/bookReservations";

export async function getReservation(req: Request, res: Response, next: NextFunction) {
    const reservationId = parseInt(req.params.id);
    let reservation;
    try {
        reservation = await BookReservation.getReservation(reservationId);
    } catch (error) {
        return next(error);
    }
    res.json({
        reservation: reservation,
    });
}

export async function getAllReservations(req: Request, res: Response, next: NextFunction) {
    try {
        const allReservations = await BookReservation.getAllReservations();
        res.json({
            reservations: allReservations,
        });
    } catch (error) {
        return next(error);
    }
}

export async function createReservation(req: Request, res: Response, next: NextFunction) {
    const {
        bookId,
        reservationMadeForUserId,
        reservationMadeByUserId,
        closeUserId,
        closureReasonId,
        request_date,
        reservation_date,
        close_date,
    } = req.body;

    try {
        const reservation = await BookReservation.createReservation(
            bookId,
            reservationMadeForUserId,
            reservationMadeByUserId,
            closeUserId,
            closureReasonId,
            request_date,
            reservation_date,
            close_date
        );

        res.json({
            message: "Kreirana je rezervacija",
            reservation: reservation,
        });
    } catch (error) {
        return next(error);
    }
}

export async function updateReservation(req: Request, res: Response, next: NextFunction) {
    const reservationId = parseInt(req.params.id);

    const {
        request_date,
        reservation_date,
        close_date,
    } = req.body;

    try {
        const reservation = await BookReservation.getReservation(reservationId); 

  
        reservation.request_date = request_date;
        reservation.reservation_date = reservation_date;
        reservation.close_date = close_date;

        await reservation.updateReservation();

        res.json({
            message: "Rezervacija update-ovana",
            reservation: reservation,
        });
    } catch (error) {
        return next(error);
    }
}

export async function deleteReservation(req: Request, res: Response, next: NextFunction) {
    const reservationId = parseInt(req.params.id);

    try {
        const reservation = await BookReservation.getReservation(reservationId); 

        await reservation.deleteReservation();

        res.json({
            message: "Rezervacija obrisana",
        });
    } catch (error) {
        return next(error);
    }
}


export async function searchReservations(req: Request, res: Response, next: NextFunction) {
    const { bookId, userId } = req.query;

    try {
       
        const parsedBookId = bookId ? parseInt(bookId as string) : undefined;
        const parsedUserId = userId ? String(userId) : undefined;

        const reservations = await BookReservation.searchReservations(parsedBookId, parsedUserId);

        res.json({
            reservations: reservations,
        });
    } catch (error) {
        return next(error);
    }
}

