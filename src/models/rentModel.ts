import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

import { User, Book, RentStatus } from "@prisma/client";

export class Rent {
  book: Book;
  rentUser: User;
  borrowUser: User;
  rentStatus: RentStatus;
  issue_date: Date;
  return_date: Date;
  id?: number;

  constructor(
    book: Book,
    rentUser: User,
    borrowUser: User,
    rentStatus: RentStatus,
    issue_date: Date,
    return_date: Date,
    id: number
  ) {
    this.book = book;
    this.rentUser = rentUser;
    this.borrowUser = borrowUser;
    this.rentStatus = rentStatus;
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
        rent.rentUser,
        rent.borrowUser,
        rent.rentStatus,
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
        rent.rentUser,
        rent.borrowUser,
        rent.rentStatus,
        rent.issue_date,
        rent.return_date,
        rent.id
      );
    }
  }

  async save() {
    ///
  }

  static async search() {
    try {
      const rents = await db.rent.findMany({
        where: {
          //šta se već pretražuje
        },
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
          rent.rentUser,
          rent.borrowUser,
          rent.rentStatus,
          rent.issue_date,
          rent.return_date,
          rent.id
        );
      });
    } catch (error) {
      throw new Error();
    }
  }
}

export default Rent;
