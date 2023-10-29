import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rentBookController = {
  rentBook: async (req: Request, res: Response) => {
    try {
      const { bookId, rentUserId, issue_date, return_date, rentStatusId, borrowUserId } = req.body;

      const rental = await prisma.rent.create({
        data: {
          book: {
            connect: {
              id: bookId,
            },
          },
          rentUser: {
            connect: {
              id: rentUserId,
            },
          },
          issue_date,
          return_date,
          rentStatus: {
            connect: {
              id: rentStatusId,
            },
          },
          borrowUser: {
            connect: {
              id: borrowUserId,
            },
          },
        },
      });

      res.status(200).json({ message: "Book rented successfully", rental });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: "Error while renting the book", details: errorMessage });
    }
  },

  updateRentBook: async (req: Request, res: Response) => {
    try {
      const { rentId, rentStatusId } = req.body;

      const updatedRental = await prisma.rent.update({
        where: {
          id: rentId,
        },
        data: {
          rentStatus: {
            connect: {
              id: rentStatusId,
            },
          },
        },
      });

      res.status(200).json({ message: "Rental status changed successfully", rental: updatedRental });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: "Error while changing rental status", details: errorMessage });
    }
  },

  displayAvailableBooks: async (req: Request, res: Response) => {
    try {
      const availableBooks = await prisma.book.findMany({
        where: {
          rents: {
            none: {},
          },
        },
      });

      res.status(200).json({ availableBooks });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: "Error while displaying all available books", details: errorMessage });
    }
  },
  searchRentedBooks: async (req: Request, res: Response) => {
    try {
      const searchQuery = req.query.searchQuery as string;

      // trazi po naslovu knjige
      const rentedBooks = await prisma.book.findMany({
        where: {
          title: {
            contains: searchQuery, // filter
          },
        },
      });

      res.status(200).json({ rentedBooks });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: "Error while searching for rented books by title", details: errorMessage });
    }
  },
};



export default rentBookController;
