import { Request, Response, NextFunction } from "express";
import BookReservation from "../models/bookReservations";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function getReservation(req: Request, res: Response, next: NextFunction) {
    const reservationId = parseInt(req.params.id);
    try {
      const reservation = await prisma.reservation.findUnique({
        where: { id: reservationId },
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
          reservationStatuses: true,
        },
      });
      if (!reservation) {
        throw new Error(`Reservation with ID ${reservationId} not found.`);
      }
      const reservationMadeForUser = {
        ...reservation.reservationMadeForUser,
        name: reservation.reservationMadeForUser.name,
      };
      const bookReservation = new BookReservation(
        reservation.id,
        reservation.book,
        reservationMadeForUser,
        reservation.reservationMadeByUser,
        reservation.closeUser,
        reservation.closureReason,
        reservation.reservationStatuses,
        reservation.request_date,
        reservation.reservation_date,
        reservation.close_date
      );
      console.log(bookReservation);
      res.render('izdavanje/izdavanjeDetalji', { reservation: bookReservation });
    } catch (error) {
      return next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
export async function getAllReservations(req: Request, res: Response, next: NextFunction) {
    try {
        const reservations = await BookReservation.getAllReservations();
        console.log(reservations)
        res.render('rezervacije/aktivneRezervacije', { reservations: reservations });
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

