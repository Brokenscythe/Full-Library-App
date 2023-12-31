import { Request, Response, NextFunction } from "express";
import Book from "../../models/bookModel";
import { PrismaClient } from '@prisma/client';
import { UserData } from "../../interfaces/userData"; // Import the UserData interface
const prisma = new PrismaClient();
/* export async function getAllBooks(req: Request, res:Response, next:NextFunction){
    let books;
    try{
        books = await Book.getAllBooks();
    }catch(error) {
        return next(error);
    }
    res.json({
        books: books,
    });
} */

/* export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await Book.getAllBooks();
      res.render('knjige/evidencijaKnjiga', { books }); 
    } catch (error) {
      return next(error);
    }
  }

export async function getBook(req: Request, res:Response, next:NextFunction){
    let bookId = parseInt(req.params.id.split(':')[1]);
    let book;
    try {
        book = await Book.getBook(bookId);
    }catch(error) {
        return next(error);
    }
    res.json({
        book: book,
    });
}
 */


export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
      const books = await prisma.book.findMany({
          include: {
              authors: true, // ukljucujuci i autora
          },
      });
console.log(books);
      res.render('knjige/evidencijaKnjiga', { books });
  } catch (error) {
      return next(error);
  }
}

export async function getBook(req: Request, res: Response, next: NextFunction) {
  try {
      const bookId = parseInt(req.params.id, 10);

    
      const book = await prisma.book.findUnique({
          where: { id: bookId },
          include: {
              authors: true,  
              categories: true,  
              genres: true,  
              publisher: true, 
              letter: true,  
              language: true, 
              binding: true,  
              format: true,  
              reservations: true,  
              rents: true 
          }
      });

      if (!book) {
         
          res.status(404).json({ error: 'Book not found' });
          return;
      }

    //  res.json({ book:book});
    res.render('knjige/knjigaOsnovniDetalji', { book });
  } catch (error) {
      
      return next(error);
  }
}


export const getBookDetails = async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        authors: true,
        categories: true,
        genres: true,
        publisher: true,
        letter: true,
        language: true,
        binding: true,
        format: true,
        reservations: true,
        rents: true,
      },
    });

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

    res.json({ book }); // detalji knjige kao JSON za rezervisiKnjigu stranicu
  } catch (error: any) {
    console.error('Error while fetching book details:', error);
    res.status(500).json({ error: 'An error occurred while fetching book details', details: error.message });
  }
};



export async function addBook(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const {
      title,
      page_count,
      letterId,
      languageId,
      bindingId,
      formatId,
      publisherId,
      isbn,
      quantity_count,
      rented_count,
      reserved_count,
      body,
      year,
      pdf,
      authorName,
      authorBio,
      authorWiki,
    } = req.body;
    console.log(authorBio);
    const concatenatedBody = ["1111", "000"].join('\n');
    
    let photoPath = "img/user_avatar.jpg"; //default slika ako nije uploadovana


    if (req.file) {

      photoPath = req.file.path; 
    }

    const newBook = {
      title,
      page_count: parseInt(page_count), 
      letterId: parseInt(letterId),
      languageId: parseInt(languageId),
      bindingId: parseInt(bindingId),
      formatId: parseInt(formatId),
      publisherId: parseInt(publisherId),
      isbn,
      quantity_count: parseInt(quantity_count), 
      rented_count: parseInt(rented_count), 
      reserved_count: parseInt(reserved_count), 
      body: concatenatedBody,
      year: parseInt(year),
      pdf,
      authors: {
        create: {
          nameSurname: authorName,
          photo: photoPath,
          biography: authorBio,
          wikipedia: authorWiki,
        },
      },
    };

    const book = await prisma.book.create({
      data: newBook,
      include: {
        authors: true,
      },
    });

    res.redirect('/books');
  } catch (error) {
    return next(error);
  }
}

export async function updateBook(req: Request, res:Response, next:NextFunction){
    let bookId = parseInt(req.params.id.split(':')[1]);
    const book = new Book(
        req.body.title,
        req.body.page_count,
        req.body.letterId,
        req.body.languageId,
        req.body.bindingId,
        req.body.formatId,
        req.body.publisherId,
        req.body.isbn,
        req.body.quantity_count,
        req.body.rented_count,
        req.body.reserved_count,
        req.body.body,
        req.body.year,
        req.body.pdf,
        req.body.id,
    );
    try{
        await book.save();
    }
    catch(error) {
        return next(error);
    }
    res.json({message: "book updated", book: book});
}

export async function deleteBook(req: Request, res:Response, next:NextFunction) {
    let bookId = parseInt(req.params.id.split(':')[1]);
    let book = new Book("", -1, -1, -1, -1, -1, -1, "", -1, -1, -1, "", -1, "", bookId);
    try{
        book.delete();
    }catch(error) {
        return next(error);
    }
    res.json({
        mesage: "Book deleted"
    });
}

export async function addBookForm(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lettersPromise = prisma.letter.findMany();
    const languagesPromise = prisma.language.findMany();
    const bindingsPromise = prisma.binding.findMany();
    const formatsPromise = prisma.format.findMany();
    const publishersPromise = prisma.publisher.findMany();
    const authorsPromise = prisma.author.findMany();

    const [letters, languages, bindings, formats, publishers, authors] = await Promise.all([lettersPromise, languagesPromise, bindingsPromise, formatsPromise, publishersPromise, authorsPromise]);

    res.render('knjige/novaKnjiga', { letters, languages, bindings, formats, publishers, authors });
  } catch (error) {
    return next(error);
  }
}
//za novu knjigu
export async function getAuthorDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { authorId } = req.params; 

    const author = await prisma.author.findUnique({
      where: {
        id: parseInt(authorId),
      },
      select: {
        photo: true,
        biography: true,
        wikipedia: true,
      },
    });

    if (!author) {
      res.status(404).json({ error: 'Autor nije pronadjen' });
      return;
    }

    res.json(author);
  } catch (error) {
    next(error);
  }
}


export async function rentBook(req: Request, res: Response, next: NextFunction) {
  try {
    
    const bookId = parseInt(req.body.bookId, 10);
    const rentUserId = parseInt(req.body.rentUserId, 10);
    const borrowUserId = parseInt(req.body.borrowUserId, 10);
    const issueDate = new Date(req.body.issue_date);
    const returnDate = new Date(req.body.return_date);
    const rentStatusId = parseInt(req.body.rentStatusId, 10);

    
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }

 
    const rental = await prisma.rent.create({
      data: {
        book: { connect: { id: bookId } },
        rentUser: { connect: { id: rentUserId } },
        borrowUser: { connect: { id: borrowUserId } },
        issue_date: issueDate,
        return_date: returnDate,
        rentStatus: { connect: { id: rentStatusId } },
      },
    });

    res.status(201).json({ message: 'Knjiga uspjesno iznajmljena', rental });
  } catch (error) {
    console.error('Greska tokom iznajmljivanje knjige:', error);
    const err = error as Error;
    res.status(500).json({ error: 'Doslo je do greske tokom iznajmljivanja', details: err.message });
  }
}

