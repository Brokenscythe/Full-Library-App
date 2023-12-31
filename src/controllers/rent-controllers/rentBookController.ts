import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


interface CustomRequest extends Request {
  flash(type: string, message?: string): any;
}

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

      //res.status(200).json({ message: "Book rented successfully", rental });
      res.redirect('/rent');
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
            borrowUser: true, // ime biblotekara
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
      const pageTitle = "Iznajmljene knjige";
      // ukupan broj dostupnih knjiga
      const availableCount = totalBooks - (rentedCount + reservedCount);
  
      res.render("iznajmljivanje/iznajmljivanjeAktivne", { rentedBooks, totalBooks, rentedCount, reservedCount, availableCount, pageTitle,  });
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

        
        const rentedBooks = await prisma.book.findMany({
            where: {
                title: {
                    contains: searchQuery, 
                },
            },
        });

 
        const totalBooks = await prisma.book.count();


        const rentedBooksResult = await prisma.book.aggregate({
            _sum: {
                rented_count: true,
            },
        });
        const rentedCount = rentedBooksResult._sum.rented_count || 0;


        const reservedBooksResult = await prisma.book.aggregate({
            _sum: {
                reserved_count: true,
            },
        });
        const reservedCount = reservedBooksResult._sum.reserved_count || 0;

       
        const availableCount = totalBooks - (rentedCount + reservedCount);

        res.status(200).json({
          title: "Iznajmljene knjige - test JSON",
          rentedBooks,
          totalBooks,
          rentedCount,
          reservedCount,
          availableCount
      });
      // res.render("iznajmljivanje/iznajmljivanjeAktivne", { rentedBooks, totalBooks, rentedCount, reservedCount, availableCount });
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
        const totalBooksByStatus = rentedBooks.length;
        console.log("Rented Books Data:", rentedBooks);

        // Pass the pageTitle to the res.render function
        res.render("izdavanje/izdateKnjige", { rentedBooks, pageTitle, totalBooksByStatus });
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

  returnRentedBook: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params; 
      const parsedBookId = parseInt(bookId, 10);
  
      const returnedBook = await prisma.rent.update({
        where: {
          id: parsedBookId, 
        },
        data: {
          rentStatus: {
            connect: {
              id: 3, // status za vracanje knjige
            },
          },
        },
      });
  
    //  res.status(200).json({ message: 'Knjiga uspjesno vracena', returnedBook }); za postmana
   // req.flash('success', 'Book returned successfully');

    // Redirekcija na /rent
    res.redirect('/rent');
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Doslo je do nepoznate greske';
      res.status(500).json({ error: 'Greska tokom vracanja knjige, u rentBook kontroleru', details: errorMessage });
    }
  },

  rentBookDetails: async (req: Request, res: Response) => {
    try {
      const { rentId } = req.params;
      const parsedRentId = parseInt(rentId, 10);
  
      const rentedBookDetails = await prisma.$queryRaw`
        SELECT
          rent.id,
          rent.bookId,
          rent.borrowUserId,
          rent.rentUserId,
          rent.issue_date,
          rent.return_date,
          borrower.username AS "BORROW",
          borrower.id AS borrowerId,
          renter.username AS "RENT",
          renter.id AS renterId,
          book.title,
          book.page_count,
          book.letterId,
          letter.name AS letterName,
          book.isbn,
          book.year,
          book.pdf,
          language.name AS languageName,
          publisher.name AS publisherName,
          format.name AS formatName
        FROM rent
        JOIN user AS borrower ON rent.borrowUserId = borrower.id
        JOIN user AS renter ON rent.rentUserId = renter.id
        JOIN book ON rent.bookId = book.id
        JOIN letter ON book.letterId = letter.id
        JOIN language ON book.languageId = language.id
        JOIN publisher ON book.publisherId = publisher.id
        JOIN format ON book.formatId = format.id
        JOIN rentstatus ON rent.rentStatusId = rentstatus.id
        JOIN bookstatus ON rent.rentStatusId = bookstatus.id
        WHERE rent.id = ${parsedRentId}
      `;
if (!rentedBookDetails) {
  return res.status(404).send('Iznajmljena knjiga nije pronađena');
}

  
      // datumi kao dd.mm.yyyy
      const formattedIssueDate = new Date(rentedBookDetails[0].issue_date).toLocaleDateString('en-GB');
      const formattedReturnDate = new Date(rentedBookDetails[0].return_date).toLocaleDateString('en-GB');
  
      // Render EJS stranicu
      res.render('izdavanje/izdavanjeDetalji', {
        rentedBookDetails: {
          title: rentedBookDetails[0].title,
          page_count: rentedBookDetails[0].page_count,
          letterId: rentedBookDetails[0].letterId,
          letterName: rentedBookDetails[0].letterName,
          isbn: rentedBookDetails[0].isbn,
          year: rentedBookDetails[0].year,
          pdf: rentedBookDetails[0].pdf,
          languageName: rentedBookDetails[0].languageName,
          publisherName: rentedBookDetails[0].publisherName,
          formatName: rentedBookDetails[0].formatName,
          rentUserId: rentedBookDetails[0].rentUserId,
          rentUserName: rentedBookDetails[0].RENT,
          borrowUserId: rentedBookDetails[0].borrowUserId,
          borrowUserName: rentedBookDetails[0].BORROW,
          issueDate: formattedIssueDate,
          returnDate: formattedReturnDate,
          rentStatusId: rentedBookDetails[0].rentStatusId,
          rentStatusName: rentedBookDetails[0].name,
        },
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Došlo je do nepoznate greške';
      res.status(500).json({ error: 'Greška tokom čitanja detalja o iznajmljenoj knjizi', details: errorMessage });
    }
  },
  //Istorija
  historyOfRentingByBookId: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const parsedBookId = parseInt(bookId, 10);
  
   
      const bookDetails = await prisma.book.findUnique({
        where: {
          id: parsedBookId,
        },
      });
  
      if (!bookDetails) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
  
      const pageTitle = `Istorija iznajmljivanja knjige "${bookDetails.title}"`;
  
      // Fetch history of renting based on bookId
      const historyOfRenting = await prisma.rent.findMany({
        where: {
          bookId: parsedBookId,
        },
        include: {
          rentUser: true,
          borrowUser: true,
          rentStatus: true,
          book: true, 
        },
      });
  
      const totalRentedById = await prisma.rent.count({
        where: {
          bookId: parsedBookId,
        },
      });
  console.log(historyOfRenting);
      res.render('izdavanje/izdataKnjigaIstorija', { historyOfRenting, pageTitle, totalRentedById });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Došlo je do nepoznate greške';
      res.status(500).json({ error: 'Greška pri dobavljanju istorije iznajmljivanja po ID-u knjige', details: errorMessage });
    }
  },
  
  
};




//vrati knjigu



export default rentBookController
