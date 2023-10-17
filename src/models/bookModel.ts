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
        authors: {
          select: {
            nameSurname: true
          }
        },
      },
    });
  
    return books.map((book: any) => {
      const authorNameSurname = book.authors.length > 0 ? book.authors[0].nameSurname : '';
      return {
        id: book.id,
        title: book.title,
        page_count: book.page_count,
        letterId: book.letterId,
        languageId: book.languageId,
        bindingId: book.bindingId,
        formatId: book.formatId,
        publisherId: book.publisherId,
        isbn: book.isbn,
        quantity_count: book.quantity_count,
        rented_count: book.rented_count,
        reserved_count: book.reserved_count,
        body: book.body,
        year: book.year,
        pdf: book.pdf,
        authorNameSurname: authorNameSurname
      };
    });
  }

  static async getBook(id: number) {
    const book = await db.book.findUnique({
      where: {
        id: id,
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
    throw new Error(`Book with id ${id} not found`);
  }

  return new Book(
    book.title ?? '',
    book.page_count ?? 0,
    book.letterId ?? 0,
    book.languageId ?? 0,
    book.bindingId ?? 0,
    book.formatId ?? 0,
    book.publisherId ?? 0,
    book.isbn ?? '',
    book.quantity_count ?? 0,
    book.rented_count ?? 0,
    book.reserved_count ?? 0,
    book.body ?? '',
    book.year ?? 0,
    book.pdf ?? '',
    book.id
  );
}

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
