import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type Author = {
  id?: number;
  nameSurname: string;
  //photo: string;
  biography: string;
  //wikipedia: string;
}

type Category = {
    id?: number;
    name: string;
    icon: string | null;
    description: string | null;
}

type Genre = {
  name: string;
  id? : number;
}

type Gallery = {
  id?: number;
  photo: string;
  cover: number;
}

type Reservation = {
  id: number;
}

type Rent = {
  id: number;
}

export class Book {
  title: string;
  pageCount: number;
  letterId: number;
  languageId: number;
  bindingId: number;
  formatId: number;
  publisherId: number;
  isbn: string;
  quantityCount: number;
  rentedCount: number;
  reservedCount: number;
  body: string;
  year: number;
  pdf: string;
  authors: Author[];
  categories: Category[];
  genres: Genre[];
  galleries: Gallery[];
  reservations: Reservation[];
  rents: Rent[];
  id?: number;

  /* constructor(id?:number){
    this.id = id
  } */
  constructor(
    title: string,
    pageCount: number,
    letterId: number,
    languageId: number,
    bindingId: number,
    formatId: number,
    publisherId: number,
    isbn: string,
    quantityCount: number,
    rentedCount: number,
    reservedCount: number,
    body: string,
    year: number,
    pdf: string,
    authors: Author[] = [],
    categories: Category[] = [],
    genres: Genre[] = [],
    galleries: Gallery[] = [],
    reservations: Reservation[] = [],
    rents: Rent[] = [],
    id: number = -1
  ) {
    this.title = title;
    this.pageCount = pageCount;
    this.letterId = letterId;
    this.languageId = languageId;
    this.bindingId = bindingId;
    this.formatId = formatId;
    this.publisherId = publisherId;
    this.isbn = isbn;
    this.quantityCount = quantityCount;
    this.rentedCount = rentedCount;
    this.reservedCount = reservedCount;
    this.body = body;
    this.year = year;
    this.pdf = pdf;
    this.authors = authors;
    this.categories = categories;
    this.genres = genres;
    this.galleries = galleries;
    this.reservations = reservations;
    this.rents = rents;
    this.id = id;
  }

  static async getAllBooks(){
    const books = db.book.findMany({
      include: {
        authors: true,
        categories: true,
        genres: true,
        galleries: true,
        reservations: true,
        rents: true
      }
  });
    return (await books).map((book) => {
      return new Book(book.title, book.page_count, book.letterId, book.languageId, book.bindingId, book.formatId, book.publisherId, book.isbn, book.quantity_count, book.rented_count, book.reserved_count, book.body, book.year, book.pdf, book.authors, book.categories, book.genres, book.galleries, book.reservations, book.rents);
    })
  }

  static async getBook(id: number) {
    const book = await db.book.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
        categories: true,
        genres: true,
        galleries: true,
        reservations: true,
        rents: true,
      },
      where: {
        id: id,
      }
     });
     if(!book) {
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

  async save(){
    if(this.id) {
      //UPDATE
      return await db.book.update({
        where: {
          id: this.id,
        },
        data: {
          title: this.title,
          page_count: this.pageCount,
          letterId: this.letterId,
          languageId: this.languageId,
          bindingId: this.bindingId,
          formatId: this.formatId,
          publisherId: this.publisherId,
          isbn: this.isbn,
          quantity_count: this.quantityCount,
          rented_count: this.rentedCount,
          reserved_count: this.reservedCount,
          body: this.body,
          year: this.year,
          pdf: this.pdf,
          authors: {
            connectOrCreate: [
              {
                where: {
                  nameSurname: this.authors[0].nameSurname,
                },
                create: {
                   nameSurname: this.authors[0].nameSurname,
                   photo: "",
                   biography: "",
                   wikipedia: "",
                },
              },
              {
                where: {
                  nameSurname: this.authors[1].nameSurname,
                },
                create: {
                   nameSurname: this.authors[1].nameSurname,
                   photo: "",
                   biography: "",
                   wikipedia: "",
                },
              },
              {
                where: {
                  nameSurname: this.authors[2].nameSurname,
                },
                create: {
                   nameSurname: this.authors[2].nameSurname,
                   photo: "",
                   biography: "",
                   wikipedia: "",
                },
              }
            ]
          },
          categories : {
            connectOrCreate : [
              {
                where: {
                  name: this.categories[0].name,
                },
                create: {
                  name: this.categories[0].name,
                  icon: "",
                  description: "",
                }
              },
              {
                where: {
                  name: this.categories[1].name,
                },
                 create: {
                  name: this.categories[1].name,
                  icon: "",
                  description: "",
                }
              },
              {
                where: {
                  name: this.categories[2].name,
                },
                 create: {
                  name: this.categories[2].name,
                  icon: "",
                  description: "",
                }
              }
            ]
          },
          genres : {
            connectOrCreate : [
              {
                where: {
                  name: this.genres[0].name,
                },
                create: {
                  name: this.genres[0].name,
                }
              },
              {
                where: {
                  name: this.genres[1].name,
                },
                create: {
                  name: this.genres[1].name,
                }
              },
              {
                where: {
                  name: this.genres[2].name,
                },
                create: {
                  name: this.genres[2].name,
                }
              },
            ]
          },
          galleries : {
            connectOrCreate: [
              {
                where: {
                  id: this.galleries[0].id,
                },
                create: {
                  photo: this.galleries[0].photo,
                  cover: this.galleries[0].cover,
                }
              },
              {
                where: {
                  id: this.galleries[1].id,
                },
                create: {
                  photo: this.galleries[1].photo,
                  cover: this.galleries[1].cover,
                }
              },
              {
                where: {
                  id: this.galleries[2].id,
                },
                create: {
                  photo: this.galleries[2].photo,
                  cover: this.galleries[2].cover,
                }
              },
            ]
          },
        }
      });
    }else{
      //CREATE
      return await db.book.create({
        data: {
          title: this.title,
          page_count: this.pageCount,
          letterId: this.letterId,
          languageId: this.languageId,
          bindingId: this.bindingId,
          formatId: this.formatId,
          publisherId: this.publisherId,
          isbn: this.isbn,
          quantity_count: this.quantityCount,
          rented_count: this.rentedCount,
          reserved_count: this.reservedCount,
          body: this.body,
          year: this.year,
          pdf: this.pdf,
          authors: {
            connectOrCreate: [
              {
                where: {
                  nameSurname: this.authors[0].nameSurname,
                },
                create: {
                   nameSurname: this.authors[0].nameSurname,
                   photo: "",
                   biography: "",
                   wikipedia: "",
                },
              },
              {
                where: {
                  nameSurname: this.authors[1].nameSurname,
                },
                create: {
                   nameSurname: this.authors[1].nameSurname,
                   photo: "",
                   biography: "",
                   wikipedia: "",
                },
              },
              {
                where: {
                  nameSurname: this.authors[2].nameSurname,
                },
                create: {
                   nameSurname: this.authors[2].nameSurname,
                   photo: "",
                   biography: "",
                   wikipedia: "",
                },
              }
            ]
          },
          categories : {
            connectOrCreate : [
              {
                where: {
                  name: this.categories[0].name,
                },
                create: {
                  name: this.categories[0].name,
                  icon: "",
                  description: "",
                }
              },
              {
                where: {
                  name: this.categories[1].name,
                },
                 create: {
                  name: this.categories[1].name,
                  icon: "",
                  description: "",
                }
              },
              {
                where: {
                  name: this.categories[2].name,
                },
                 create: {
                  name: this.categories[2].name,
                  icon: "",
                  description: "",
                }
              }
            ]
          },
          genres : {
            connectOrCreate : [
              {
                where: {
                  name: this.genres[0].name,
                },
                create: {
                  name: this.genres[0].name,
                }
              },
              {
                where: {
                  name: this.genres[1].name,
                },
                create: {
                  name: this.genres[1].name,
                }
              },
              {
                where: {
                  name: this.genres[2].name,
                },
                create: {
                  name: this.genres[2].name,
                }
              },
            ]
          },
          galleries : {
            connectOrCreate: [
              {
                where: {
                  id: this.galleries[0].id,
                },
                create: {
                  photo: this.galleries[0].photo,
                  cover: this.galleries[0].cover,
                }
              },
              {
                where: {
                  id: this.galleries[1].id,
                },
                create: {
                  photo: this.galleries[1].photo,
                  cover: this.galleries[1].cover,
                }
              },
              {
                where: {
                  id: this.galleries[2].id,
                },
                create: {
                  photo: this.galleries[2].photo,
                  cover: this.galleries[2].cover,
                }
              },
            ]
          },
        
      }});
    }
  }

  static async delete(id: number) {
    await db.book.delete({
      where: {
        id: id,
      },
    });
  }
}

export default Book;
