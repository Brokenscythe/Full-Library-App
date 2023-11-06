import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rentBookController = {
  rentBook: async (req: Request, res: Response) => {
    try {
      const { bookId, rentUserId, issue_date, return_date, rentStatusId, borrowUserId } = req.body;

      // sve kao Int
      const parsedBookId = parseInt(bookId, 10);
      const parsedRentUserId = parseInt(rentUserId, 10);
      const parsedRentStatusId = parseInt(rentStatusId, 10);
      const parsedBorrowUserId = parseInt(borrowUserId, 10);
       // Log da vidim dje je greska

        // vazda isto ISO-8601 DateTime format
      const formattedIssueDate = new Date(issue_date).toISOString();
      const formattedReturnDate = new Date(return_date).toISOString();


       console.log('Received Data:');
       console.log('bookId:', bookId);
       console.log('rentUserId:', rentUserId);
       console.log('issue_date:', issue_date);
       console.log('return_date:', return_date);
       console.log('rentStatusId:', rentStatusId);
       console.log('borrowUserId:', borrowUserId);
      
      const rental = await prisma.rent.create({
        data: {
          book: {
            connect: {
              id: parsedBookId,
            },
          },
          rentUser: {
            connect: {
              id: parsedRentUserId,
            },
          },
          issue_date: formattedIssueDate,
          return_date: formattedReturnDate,
          rentStatus: {
            connect: {
              id: parsedRentStatusId,
            },
          },
          borrowUser: {
            connect: {
              id: parsedBorrowUserId,
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
  
  viewRentedBooksByStatusID: async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string | undefined;
      if (status === undefined) {
        return res.status(400).json({ error: "Invalid status in viewRentedBooksByStatusID" });
      }
      
      const statusId = parseInt(status, 10);
      
  
  
  
      if (isNaN(statusId)) {
      
        return res.status(400).json({ error: "Invalid status u viewRentedBooksByStatusID" });
      }
  
      const rentedBooks = await prisma.rent.findMany({
        where: {
          rentStatusId: statusId,
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
  
      res.render("iznajmljivanje/iznajmljivanjeAktivne", {
        rentedBooks,
        totalBooks,
        rentedCount,
        reservedCount,
        availableCount,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Doslo je do nepoznate greske ";
      res.status(500).json({ error: "Error while fetching rented books by status", details: errorMessage });
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
        const rentStatusId = parseInt(req.query.rentStatusId as string, 10);

        
        let pageTitle = "";
        switch (rentStatusId) {
            case 2:
                pageTitle = "Izdate Knjige";
                break;
            case 3:
                pageTitle = "Vracene knjige";
                break;
            case 4:
                pageTitle = "Knjige u prekoracenju";
                break;
            case 5:
                pageTitle = "Otpisane knjige";
                break;
            case 6:
                pageTitle = "Nema na stanju";
                break;
            case 7:
                pageTitle = "Arhivirane knjige";
                break;
            default:
                pageTitle = "Nepoznato";
        }

        const rentedBooks = await prisma.rent.findMany({
            where: {
                rentStatusId: rentStatusId,
            },
            include: {
                book: true,
                rentStatus: true,
                rentUser: {
                    select: {
                        name: true,
                    },
                },
                borrowUser: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        console.log("Rented Books Data:", rentedBooks);

        // Pass the pageTitle to the res.render function
        res.render("izdavanje/izdateKnjige", { rentedBooks, pageTitle });
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "Nepoznata greska u rent kontroleru";
        res.status(500).json({ error: "Greska tokom trazenja po rentStatusId u rent kontroleru", details: errorMessage });
    }
},



  displayBookDetails: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params; //izvuci Id iz url-a

      // vazda muka...Int
      const parsedBookId = parseInt(bookId, 10);

      // detalji knjige
      const book = await prisma.book.findUnique({
        where: {
          id: parsedBookId,
        },
      });

      if (!book) {
        return res.status(404).send('Knjiga nije nadjena');
      }

      // Render  EJS stranicu
      res.render('izdavanje/izdajKnjigu', { book });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Doslo je do nepoznate greske';
      res.status(500).json({ error: 'Greska tokom pronalazenja detalja knjige, u rent controlleru', details: errorMessage });
    }
  },

};




export default rentBookController;
