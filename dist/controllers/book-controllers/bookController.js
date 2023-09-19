"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBook = exports.getAllBooks = void 0;
const bookModel_1 = __importDefault(require("../../models/bookModel"));
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
function getAllBooks(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield bookModel_1.default.getAllBooks();
            res.render("index", { books });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllBooks = getAllBooks;
function getBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookId = parseInt(req.params.id.split(":")[1]);
        let book;
        try {
            book = yield bookModel_1.default.getBook(bookId);
        }
        catch (error) {
            return next(error);
        }
        res.json({
            book: book,
        });
    });
}
exports.getBook = getBook;
function addBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookId = parseInt(req.params.id.split(":")[1]);
        const book = new bookModel_1.default(req.body.title, req.body.page_count, req.body.letterId, req.body.languageId, req.body.bindingId, req.body.formatId, req.body.publisherId, req.body.isbn, req.body.quantity_count, req.body.rented_count, req.body.reserved_count, req.body.body, req.body.year, req.body.pdf, req.body.id);
        try {
            yield book.save();
        }
        catch (error) {
            return next(error);
        }
        res.json({ message: "added new book", book: book });
    });
}
exports.addBook = addBook;
function updateBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookId = parseInt(req.params.id.split(":")[1]);
        const book = new bookModel_1.default(req.body.title, req.body.page_count, req.body.letterId, req.body.languageId, req.body.bindingId, req.body.formatId, req.body.publisherId, req.body.isbn, req.body.quantity_count, req.body.rented_count, req.body.reserved_count, req.body.body, req.body.year, req.body.pdf, req.body.id);
        try {
            yield book.save();
        }
        catch (error) {
            return next(error);
        }
        res.json({ message: "book updated", book: book });
    });
}
exports.updateBook = updateBook;
function deleteBook(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookId = parseInt(req.params.id.split(":")[1]);
        let book = new bookModel_1.default("", -1, -1, -1, -1, -1, -1, "", -1, -1, -1, "", -1, "", bookId);
        try {
            book.delete();
        }
        catch (error) {
            return next(error);
        }
        res.json({
            mesage: "Book deleted",
        });
    });
}
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookController.js.map