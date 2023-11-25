import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

import { User, Book, RentStatus } from "@prisma/client";

export class Rent {
  book: Book;
  bookId: number;
  rentUser: User;
  rentUserId: string;
  borrowUser: User;
  borrowUserId: string;
  rentStatus: RentStatus;
  rentStatusId: number;
  issue_date: Date;
  return_date: Date;
  id?: number;

  constructor(
    book: Book,
    bookId: number,
    rentUser: User,
    rentUserId: string,
    borrowUser: User,
    borrowUserId: string,
    rentStatus: RentStatus,
    rentStatusId: number,
    issue_date: Date,
    return_date: Date,
    id?: number
  ) {
    this.book = book;
    this.bookId = bookId;
    this.rentUser = rentUser;
    this.rentUserId = rentUserId;
    this.borrowUser = borrowUser;
    this.borrowUserId = borrowUserId;
    this.rentStatus = rentStatus;
    this.rentStatusId = rentStatusId;
    this.issue_date = issue_date;
    this.return_date = return_date;
    this.id = id;
  }

  static async getAllRents() {
    const rents = await db.rent.findMany({
      include: {
        book: true,
        rentUser: true,
        borrowUser: true,
        rentStatus: true,
      },
    });
    return rents.map((rent) => {
      return new Rent(
        rent.book,
        rent.book.id,
        rent.rentUser,
        rent.rentUser.id,
        rent.borrowUser,
        rent.borrowUser.id,
        rent.rentStatus,
        rent.rentStatus.id,
        rent.issue_date,
        rent.return_date,
        rent.id
      );
    });
  }

  static async getRent(id: number) {
    const rent = await db.rent.findUnique({
      where: {
        id,
      },
      include: {
        book: true,
        rentUser: true,
        borrowUser: true,
        rentStatus: true,
      },
    });

    if (rent) {
      return new Rent(
        rent.book,
        rent.book.id,
        rent.rentUser,
        rent.rentUser.id,
        rent.borrowUser,
        rent.borrowUser.id,
        rent.rentStatus,
        rent.rentStatus.id,
        rent.issue_date,
        rent.return_date,
        rent.id
      );
    }
  }

  async save() {
    if (this.id) {
      return await db.rent.update({
        where: { id: this.id },
        data: {
          book: {
            connect: { id: this.bookId }
          },
          rentUser: {
            connect: { id: this.rentUserId }
          },
          borrowUser: {
            connect: { id: this.borrowUserId }
          },
          issue_date: this.issue_date,
          return_date: this.return_date,
          rentStatus: {
            connect: { id: this.rentStatusId }
          }
        },
      });
    } else {
      return await db.rent.create({
        data: {
          book: {
            connect: { id: this.bookId }
          },
          rentUser: {
            connect: { id: this.rentUserId }
          },
          borrowUser: {
            connect: { id: this.borrowUserId }
          },
          issue_date: this.issue_date,
          return_date: this.return_date,
          rentStatus: {
            connect: { id: this.rentStatusId }
          }
        },
      });
    }
  }

  /// PRETRAGA PO NASLOVU KNJIGE
  static async search(bookName:string) {
    try {
      const books = await db.book.findMany({
        where: {
          title: {
            contains: bookName,
            //mode: 'insensitive'
          },
        },
      });
      const bookIds = books.map(book => book.id);
      const rents = await db.rent.findMany({
        where: {
          bookId: {
            in: bookIds
          },
        },
        include: {
          book: true,
        },
      });
      return rents;
    } catch (error) {
      throw error;
    }
  }
  async delete() {
    if (this.id) {
      return await db.rent.delete({
        where: { id: this.id },
      });
    } else {
      throw new Error('Cannot delete a record without an id');
    }
  }
}

export default Rent;
