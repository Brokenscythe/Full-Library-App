import { Request, Response, NextFunction } from "express";
import Book from "../../models/bookModel";
import { PrismaClient } from '@prisma/client';
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
      const books = await Book.getAllBooks();
      res.render('knjige/evidencijaKnjiga', { books, authorNameSurname: books[0].authorNameSurname }); 
    } catch (error) {
      return next(error);
    }
  }

  export async function getBook(req: Request, res: Response, next: NextFunction) {
    try {
      
        const bookId = parseInt(req.params.id, 10);
        
      
        const book = await Book.getBook(bookId);

     
        res.json({
            book: book,
        //    authorNameSurname: book.authors[0]?.nameSurname || '', 
        });
    } catch (error) {
        // Handluj greske
        return next(error);
    }
}


export async function addBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, page_count, letterId, languageId, bindingId, formatId, publisherId, isbn, quantity_count, rented_count, reserved_count, body, year, pdf, authorName, authorPhoto, authorBio, authorWiki } = req.body;
  
      const newBook = {
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
        authors: {
          create: {
            nameSurname: authorName,
            photo: authorPhoto,
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

