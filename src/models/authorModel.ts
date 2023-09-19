import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Author {
  id?: number;
  nameSurname: string;
  photo: string;
  biography: string;
  wikipedia: string;
  //created_at: Date;
  //updated_at: Date;

  constructor(
    nameSurname: string,
    photo: string,
    biography: string,
    wikipedia: string,
    id?: number
    //created_at: Date;
    //updated_at: Date;
  ) {
    this.nameSurname = nameSurname;
    this.photo = photo;
    this.biography = biography;
    this.wikipedia = wikipedia;
    if (id) {
      this.id = id;
    }
  }

  static async getAllAuthors() {
    const authors = await db.author.findMany();
    return authors.map((author: any) => {
      return new Author(author.nameSurname, author.photo, author.biography, author.wikipedia, author.id);
    });
  }

  /* static async getAuthor(id: number) {
    const author = await db.author.findUnique({
      where: {
        id,
      },
    });

    if (!author) {
      throw new Error("Author not found");
    }

    return new Author(author.nameSurname, author.photo, author.biography, author.wikipedia, author.id);
  } */

  async save() {
    if (this.id) {
      return await db.author.update({
        where: {
          id: this.id,
        },
        data: {
          nameSurname: this.nameSurname,
          photo: this.photo,
          biography: this.biography,
          wikipedia: this.wikipedia,
          updated_at: Date(),
        },
      });
    } else {
      return await db.author.create({
        data: {
          nameSurname: this.nameSurname,
          photo: this.photo,
          biography: this.biography,
          wikipedia: this.wikipedia,
          created_at: Date(),
          updated_at: Date(),
        },
      });
    }
  }

  async delete() {
    if (!this.id) {
      throw new Error("Trying to delete a non-existent item");
    }

    await db.author.delete({
      where: {
        id: this.id,
      },
    });
  }
}

export default Author;
