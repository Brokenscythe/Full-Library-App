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
  
      res.status(201).json({ message: "Reservation created successfully", reservation });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Error while creating a reservation", details: errorMessage });
    }
  },
  createReservationForm: async (req: Request, res: Response) => {
    try {
      // Fetch data needed for the reservation form
      const books = await prisma.book.findMany();
      const ucenikUsers = await prisma.user.findMany(); // Fetch all users
      const cancellationReasons = await prisma.cancellationReason.findMany();

      res.render("rezervacije/rezervisiKnjigu", {
        books,
        ucenikUsers,
        cancellationReasons,
        // Pass any other data you need here
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Error while creating a reservation", details: errorMessage });
    }
  },
  
  

  getAllReservations: async (req: Request, res: Response) => {
    try {
      const reservations = await prisma.reservation.findMany({
        include: {
          book: true,
          reservationMadeForUser: true,
          reservationMadeByUser: true,
          closeUser: true,
          closureReason: true,
        },
      });

     // res.status(200).json({ reservations });
      res.render("rezervacije/aktivneRezervacije", { reservations });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Error while fetching reservations", details: errorMessage });
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
        res.status(404).json({ error: "Reservation not found" });
      } else {
        res.status(200).json({ reservation });
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske u kontroleru trezervacija";
      res.status(500).json({ error: "Error while fetching reservation by ID", details: errorMessage });
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
      res.status(500).json({ error: "Error while updating a reservation", details: errorMessage });
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
      res.status(500).json({ error: "Error while deleting a reservation", details: errorMessage });
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
