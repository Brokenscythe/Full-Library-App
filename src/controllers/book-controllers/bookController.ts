import { Request, Response, NextFunction } from "express";
import Book from "../../models/bookModel";

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

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const books = await Book.getAllBooks();
        res.render('index', { books }); 
    } catch (error) {
        return next(error);
    }
}

/* export async function getBook(req: Request, res:Response, next:NextFunction){
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
} */

export async function addBook(req: Request, res:Response, next:NextFunction){
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
        res.json({message: "added new book", book: book});
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

