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
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske ";
      res.status(500).json({ error: "Error while renting the book", details: errorMessage });
    }
  },
  viewRentedBooksByStatus: async (req: Request, res: Response) => {
    try {
      const rentStatusId = 2; // izdate knjige imaju status 2
  
      const rentedBooks = await prisma.rent.findMany({
        where: {
          rentStatusId: rentStatusId,
        },
        include: {
          book: true,
          rentStatus: true,
        },
      });
  
      // ukupan broj knjiga
      const totalBooks = await prisma.book.count();
  
      // ukupan broj iznajmljenih knjiga
      const rentedBooksResult = await prisma.book.aggregate({
        _sum: {
          rented_count: true,
        },
      });
      const rentedCount = rentedBooksResult._sum.rented_count || 0;
  
      // ukupan broj rezervisanih knjiga
      const reservedBooksResult = await prisma.book.aggregate({
        _sum: {
          reserved_count: true,
        },
      });
      const reservedCount = reservedBooksResult._sum.reserved_count || 0;
  
      // ukupan broj dostupnih knjiga
      const availableCount = totalBooks - (rentedCount + reservedCount);
  
      res.render("iznajmljivanje/iznajmljivanjeAktivne", { rentedBooks, totalBooks, rentedCount, reservedCount, availableCount });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske ";
      res.status(500).json({ error: "Error while fetching rented books by rentStatusId", details: errorMessage });
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

      res.status(200).json({ message: "Status iznajmljene knjige je promijenjen", rental: updatedRental });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske ";
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
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske ";
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
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske ";
      res.status(500).json({ error: "Greska tokom trazenja iznajmljenih knjiga po naslovu knjige, u rent kontroleru", details: errorMessage });
    }
  },
  searchRentedBooksStatus: async (req: Request, res: Response) => {
    try {
      const rentStatusId = parseInt(req.query.rentStatusId as string, 10); // Parse the rentStatusId from the query string

      const rentedBooks = await prisma.rent.findMany({
        where: {
          rentStatusId: rentStatusId, // Filter  rentStatusId tako trazimo izdate,vracene,prekoracenje itd
        },
        include: {
          book: true, // ukljucujuci i detalje o knjizi
          rentStatus: true, // ukljucujuci i rent status
        },
      });

      res.status(200).json({ rentedBooks });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Nepoznata greska u rent kontroleru";
      res.status(500).json({ error: "Greska tokom trazenja po rentStatusId u rent kontroleru", details: errorMessage });
    }
  },
};




export default rentBookController;
