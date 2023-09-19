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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
/* type _Book = {
    id: number;
    title: string;
    page_count: number;
    letterId: number;
    languageId: number;
    bindingId: number;
    formatId: number;
    publisherId: number;
    isbn: string;
    quantity_count: number;
    rented_count: number;
    reserved_count: number;
    body: string;
    year: number;
    pdf: string;
}; */
class Book {
    constructor(title, page_count, letterId, languageId, bindingId, formatId, publisherId, isbn, quantity_count, rented_count, reserved_count, body, year, pdf, id) {
        this.id = id;
        this.title = title;
        this.page_count = page_count;
        this.letterId = letterId;
        this.languageId = languageId;
        this.bindingId = bindingId;
        this.formatId = formatId;
        this.publisherId = publisherId;
        this.isbn = isbn;
        this.quantity_count = quantity_count;
        this.rented_count = rented_count;
        this.reserved_count = reserved_count;
        this.body = body;
        this.year = year;
        this.pdf = pdf;
    }
    static getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield db.book.findMany({
                include: {
                    language: true,
                    format: true,
                    letter: true,
                    categories: true,
                    binding: true,
                    authors: true,
                },
            });
            return books.map((book) => {
                return new Book(book.title, book.page_count, book.letterId, book.languageId, book.bindingId, book.formatId, book.publisherId, book.isbn, book.quantity_count, book.rented_count, book.reserved_count, book.body, book.year, book.pdf, book.id);
            });
        });
    }
    static getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield db.book.findUnique({
                where: {
                    id,
                },
                include: {
                    language: true,
                    format: true,
                    letter: true,
                    categories: true,
                    binding: true,
                    authors: true,
                },
            });
            if (!book) {
                throw new Error("Book not found");
            }
            return new Book(book.title, book.page_count, book.letterId, book.languageId, book.bindingId, book.formatId, book.publisherId, book.isbn, book.quantity_count, book.rented_count, book.reserved_count, book.body, book.year, book.pdf, book.id);
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                return db.book.update({
                    where: {
                        id: this.id,
                    },
                    data: {
                        title: this.title,
                        page_count: this.page_count,
                        letterId: this.letterId,
                        languageId: this.languageId,
                        bindingId: this.bindingId,
                        formatId: this.formatId,
                        publisherId: this.publisherId,
                        isbn: this.isbn,
                        quantity_count: this.quantity_count,
                        rented_count: this.rented_count,
                        reserved_count: this.reserved_count,
                        body: this.body,
                        year: this.year,
                        pdf: this.pdf,
                    },
                });
            }
            else {
                return db.book.create({
                    data: {
                        title: this.title,
                        page_count: this.page_count,
                        letterId: this.letterId,
                        languageId: this.languageId,
                        bindingId: this.bindingId,
                        formatId: this.formatId,
                        publisherId: this.publisherId,
                        isbn: this.isbn,
                        quantity_count: this.quantity_count,
                        rented_count: this.rented_count,
                        reserved_count: this.reserved_count,
                        body: this.body,
                        year: this.year,
                        pdf: this.pdf,
                    },
                });
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                throw new Error("Trying to delete a non-existent item");
            }
            yield db.book.delete({
                where: {
                    id: this.id,
                },
            });
        });
    }
}
exports.Book = Book;
exports.default = Book;
//# sourceMappingURL=bookModel.js.map