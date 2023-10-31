import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reservationController = {
  createReservation: async (req: Request, res: Response) => {
    try {
      const { bookId, reservationMadeForUserId, reservationMadeByUserId, closureReasonId, request_date, reservation_date, close_date, closeUserId } = req.body;
  
      const reservation = await prisma.reservation.create({
        data: {
          book: {
            connect: {
              id: bookId,
            },
          },
          reservationMadeForUser: {
            connect: {
              id: reservationMadeForUserId,
            },
          },
          reservationMadeByUser: {
            connect: {
              id: reservationMadeByUserId,
            },
          },
          closeUser: {
            connect: {
              id: closeUserId,
            },
          },
          closureReason: {
            connect: {
              id: closureReasonId,
            },
          },
          request_date,
          reservation_date,
          close_date,
        }
      });
  
      res.status(201).json({ message: "Rezervisana knjiga uspjesno!", reservation });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do greske tokom kreiranja rezervacije, u kontroleru rezervacija", details: errorMessage });
    }
  },
  createReservationForm: async (req: Request, res: Response) => {
    try {
     
      const books = await prisma.book.findMany();
      const ucenikUsers = await prisma.user.findMany();
      const cancellationReasons = await prisma.cancellationReason.findMany();
  
/*       res.json({
        books,
        ucenikUsers,
        cancellationReasons,
      
      }); */
      res.render("rezervacije/rezervisiKnjigu", {
        books,
        ucenikUsers,
        cancellationReasons,
        csrfToken: req.csrfToken(), 
      });
    } catch (error: any) {
      console.error("Error while fetching data for reservation form:", error);
  
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do greske tokom prikazivanja forme rezervacije, u kontroleru rezervacija", details: errorMessage });
    }
  },
  
  
  

  getAllReservations: async (req: Request, res: Response) => {
    try {
      // izracunaj ukupna broj knjiga
      const totalBooks = await prisma.book.count();

      // izracunaj ukupna broj  iznajmljenih knjiga
      const rentedBooksResult = await prisma.book.aggregate({
        _sum: {
          rented_count: true,
        },
      });
      const rentedBooks = rentedBooksResult._sum.rented_count || 0;

      // izracunaj ukupna broj rezervsisanih knjiga
      const reservedBooksResult = await prisma.book.aggregate({
        _sum: {
          reserved_count: true,
        },
      });
      const reservedBooks = reservedBooksResult._sum.reserved_count || 0;

      // izracunaj ukupna broj dostupnih knjiga
      const availableBooks = totalBooks - (rentedBooks + reservedBooks);

      const reservations = await prisma.reservation.findMany({
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
        },
      });

      res.render("rezervacije/aktivneRezervacije", {
        reservations,
        totalBooks,
        rentedBooks,
        reservedBooks,
        availableBooks,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do nepoznate greske prilikom trazenja rezervacija, u kontroleru rezervacija", details: errorMessage });
    }
  },
  getReservationById: async (req: Request, res: Response) => {
    try {
      const { reservationId } = req.params;
      const reservation = await prisma.reservation.findUnique({
        where: { id: Number(reservationId) },
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
        },
      });
  
      if (!reservation) {
        res.status(404).json({ error: "Rezervacija nije nadjenja" });
      } else {
        // postman za kontrolu
        res.status(200).json({ reservation });
       // res.render('rezervacije/rezervisiKnjigu', { reservation });
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do nepoznate greske prilikom trazenja rezervacija po ID, u kontroleru rezervacija", details: errorMessage });
    }
  },
  

  updateReservation: async (req: Request, res: Response) => {
    try {
      const { reservationId } = req.params;
      const {
        bookId,
        reservationMadeForUserId,
        reservationMadeByUserId,
        closureReasonId,
        request_date,
        reservation_date,
        close_date,
      } = req.body;
  
      const updatedReservation = await prisma.reservation.update({
        where: { id: Number(reservationId) },
        data: {
          book: {
            connect: {
              id: bookId,
            },
          },
          reservationMadeForUser: {
            connect: {
              id: reservationMadeForUserId,
            },
          },
          reservationMadeByUser: {
            connect: {
              id: reservationMadeByUserId,
            },
          },
          closureReason: {
            connect: {
              id: closureReasonId,
            },
          },
          request_date,
          reservation_date,
          close_date,
        },
      });
  
      res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do nepoznate greske prilikom trazenja rezervacija, u kontroleru rezervacija", details: errorMessage });
    }
  },
  

  deleteReservation: async (req: Request, res: Response) => {
    try {
      const { reservationId } = req.params;

      await prisma.reservation.delete({
        where: { id: Number(reservationId) },
      });

      res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do nepoznate greske prilikom brisanja rezervacija, u kontroleru rezervacija", details: errorMessage });
    }
  },
  searchReservationsByBookTitle: async (req: Request, res: Response) => {
    try {
      const searchQuery = req.query.searchQuery as string;

      const reservations = await prisma.reservation.findMany({
        where: {
          book: {
            title: {
              contains: searchQuery,
            },
          },
        },
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
        },
      });

      res.status(200).json({ reservations });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do nepoznate greske tokom pretrage po nazivu knjige, u kontroleru rezervacija", details: errorMessage });
    }
  },

  searchReservationsByUserName: async (req: Request, res: Response) => {
    try {
      const searchQuery = req.query.searchQuery as string;

      const reservations = await prisma.reservation.findMany({
        where: {
          reservationMadeForUser: {
            name: {
              contains: searchQuery,
            },
          },
        },
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
        },
      });

      res.status(200).json({ reservations });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Doslo je do nepoznate greske tokom pretrage po korisnickom imenu, u kontroleru rezervacija", details: errorMessage });
    }
  },
  
};



export default reservationController;
