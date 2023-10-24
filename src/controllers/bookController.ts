import { Request, Response, NextFunction } from "express";
import Book from "../models/bookModel";

export async function getAllBooks(req: Request, res: Response, next: NextFunction){
    try {
        const books = await Book.getAllBooks();
        res.render('knjiga/evidencijaKnjiga', { books : books }); 
    } catch (error) {
        return next(error);
    }
}

export async function getBook(req: Request, res: Response, next: NextFunction){
    const bookId = parseInt(req.params.id.split(':')[0]);
    let book;
    try{
        book = await Book.getBook(bookId);
        return book;
        //res.render('knjiga/knjigaOsnovniDetalji', {book: book});
    }
    catch(error){
        return next(error);
    }
}

export async function addBook(req: Request, res: Response, next: NextFunction){
    const book = new Book(
        req.body.title,
        req.body.pageCount,
        req.body.letterId,
        req.body.languageId,
        req.body.bindingId,
        req.body.formatId,
        req.body.publisherId,
        req.body.isbn,
        req.body.quantityCount,
        req.body.rentedCount,
        req.body.reservedCount,
        req.body.body,
        req.body.year,
        req.body.pdf,
        req.body.authors,
        req.body.categories,
        req.body.genres,
        req.body.galleries,
        req.body.reservations,
        req.body.rents,
    );
    try{
        await book.save();
    } catch(error) {
        next(error);
    }
}

export async function updateBook(req: Request, res: Response, next: NextFunction){
    const bookId = parseInt(req.params.id.split(':')[0]);
    const book = new Book(
        req.body.title,
        req.body.pageCount,
        req.body.letterId,
        req.body.languageId,
        req.body.bindingId,
        req.body.formatId,
        req.body.publisherId,
        req.body.isbn,
        req.body.quantityCount,
        req.body.rentedCount,
        req.body.reservedCount,
        req.body.body,
        req.body.year,
        req.body.pdf,
        req.body.authors,
        req.body.categories,
        req.body.genres,
        req.body.galleries,
        req.body.reservations,
        req.body.rents,
        bookId,
    );
    try{
        await book.save();
        res.render('knjiga/evidencijaKnjiga');
    } catch(error) {
        next(error);
    }
}

export async function deleteBook(req: Request, res: Response, next: NextFunction){
    const bookId = parseInt(req.params.id.split(':')[0]);
    try{
        Book.delete(bookId);
    }catch(error) {
        return next(error);
    }
    res.json({
        mesage: "Book deleted"
    });
}
