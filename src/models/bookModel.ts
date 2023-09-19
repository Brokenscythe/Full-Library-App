import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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

export class Book {
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

  constructor(
    title: string,
    page_count: number,
    letterId: number,
    languageId: number,
    bindingId: number,
    formatId: number,
    publisherId: number,
    isbn: string,
    quantity_count: number,
    rented_count: number,
    reserved_count: number,
    body: string,
    year: number,
    pdf: string,
    id: number
  ) {
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

  static async getAllBooks() {
    const books = await db.book.findMany({
      include: {
        language: true,
        format: true,
        letter: true,
        categories: true,
        binding: true,
        authors: true,
      },
    });

    return books.map((book: any) => {
      return new Book(
        book.title,
        book.page_count,
        book.letterId,
        book.languageId,
        book.bindingId,
        book.formatId,
        book.publisherId,
        book.isbn,
        book.quantity_count,
        book.rented_count,
        book.reserved_count,
        book.body,
        book.year,
        book.pdf,
        book.id
      );
    });
  }

  /* static async getBook(id: number) {
    const book = await db.book.findUnique({
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

    return new Book(
      book.title,
      book.page_count,
      book.letterId,
      book.languageId,
      book.bindingId,
      book.formatId,
      book.publisherId,
      book.isbn,
      book.quantity_count,
      book.rented_count,
      book.reserved_count,
      book.body,
      book.year,
      book.pdf,
      book.id
    );
  } */

  async save() {
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
    } else {
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
  }

  async delete() {
    if (!this.id) {
      throw new Error("Trying to delete a non-existent item");
    }

    await db.book.delete({
      where: {
        id: this.id,
      },
    });
  }
}

export default Book;
