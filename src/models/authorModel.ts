import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Author {
  nameSurname: string;
  photo: string;
  biography: string;
  wikipedia: string;
  created_at?: Date;
  updated_at?: Date;
  id?: number;

  constructor(
    nameSurname: string,
    photo: string,
    biography: string,
    wikipedia: string,
    created_at?: Date,
    updated_at?: Date,
    id?: number
  ) {
    this.nameSurname = nameSurname;
    this.photo = photo;
    this.biography = biography;
    this.wikipedia = wikipedia;
    this.created_at = created_at;
    this.updated_at = updated_at;
    if (id) {
      this.id = id;
    }
  }

  static getAllAuthors() {
    return db.author.findMany();
  }

  static async getAuthor(id: number) {
    const author = await db.author.findUnique({
      where: {
        id,
      },
    });
    if (!author) {
      throw new Error("Author not found");
    }
    return author;
  }

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
          updated_at: new Date(),
        },
      });
    } else {
      return await db.author.create({
        data: {
          nameSurname: this.nameSurname,
          photo: this.photo,
          biography: this.biography,
          wikipedia: this.wikipedia,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }
  }

  async delete() {
    if (!this.id) {
      throw new Error("Trying to delete a non-existent author");
    }
    return await db.author.delete({
      where: {
        id: this.id,
      },
    });
  }
}

export default Author;
