import { Request, Response, NextFunction } from "express";
import BookReservation from "../models/bookReservations";
import Book from "../models/bookModel";
import { Settings } from "@prisma/client";
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
      console.log(`Reservation with ID ${reservationId} not found.`);
      res.render('izdavanje/izdavanjeDetalji', { reservation: bookReservation });
    } catch (error) {
      return next(error);
    } finally {
      await prisma.$disconnect();
    }
  }
  export async function getAllReservations(req: Request, res: Response, next: NextFunction) {
    try {
      // Fetch reservations with related user information
      const reservationsWithUsers = await prisma.reservation.findMany({
        include: {
          reservationMadeByUser: true,
          reservationMadeForUser: true,
          book: true, // Include book information
        },
      });
  
      // Render the view with reservations and user information
      res.render('rezervacije/aktivneRezervacije', { reservationsWithUsers: reservationsWithUsers });
    } catch (error) {
      return next(error);
    }
  }



export async function createReservation(req, res) {
  try {
    // Extract data from the request body or wherever it is available
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

    // Create a new book reservation
    const reservation = await prisma.reservation.create({
      data: {
        bookId,
        reservationMadeForUserId,
        reservationMadeByUserId,
        closeUserId,
        closureReasonId,
        request_date,
        reservation_date,
        close_date,
      },
    });

    // Send a success response
    res.status(201).json({ message: 'Book reservation created successfully', reservation });
  } catch (error) {
    // Handle errors
    console.error('Error creating book reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

export async function rezervisiKnjigu(req: Request, res: Response) {

  try {
    const ucenikUsers = await prisma.user.findMany({
      where: {
        typeId: 1, //ucenik
      },
      select: {
        id:true,
        typeId: true,
        email: true,
        username: true,
        name: true,
        active: true,
      },
    });

    const cancellationReasons = await prisma.cancellationReason.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    //nadji usere koji rezervisu,m otkazuju...
    const users = await prisma.user.findMany();
    const reservationMadeForUserId = users.length > 0 ? users[0].id : "";

    interface Book {
      id: number;
      title: string;
      page_count: number;
      letterId: number;
      languageId: number;
      bindingId: number;
      formatId: number;
      publisherId: number;
      isbn: string;
      quantity_count: number;
      rented_count: number;
      reserved_count: number;
      body: string;
      year: number;
      pdf: string;
    }
    
    
    
    const books: Book[] = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        page_count: true,
        letterId: true,
        languageId: true,
        bindingId: true,
        formatId: true,
        publisherId: true,
        isbn: true,
        quantity_count: true,
        rented_count: true,
        reserved_count: true,
        body: true,
        year: true,
        pdf: true,
      },
    }) as Book[];
    

    const availableBooks = books.filter(({ quantity_count, rented_count, reserved_count }) => quantity_count - rented_count - reserved_count > 0);


    res.render("rezervacije/rezervacijaTest", { ucenikUsers, cancellationReasons, books: availableBooks ,reservationMadeForUserId: reservationMadeForUserId,});
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving data.");
  } finally {
    await prisma.$disconnect();
  }
}





