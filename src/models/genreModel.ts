import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Genre {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }

  static getAllGenres() {
    return db.genre.findMany();
  }

  static async getGenre(genreId: number) {
    return await db.genre.findUnique({
      where: {
        id: genreId,
      },
    });
  }

  async save() {
    if (this.id) {
      return await db.genre.update({
        where: {
          id: this.id,
        },
        data: {
          name: this.name,
        },
      });
    } else {
      return await db.genre.create({
        data: {
          name: this.name,
        },
      });
    }
  }

  async delete() {
    if (this.id) {
      await db.genre.delete({
        where: {
          id: this.id,
        },
      });
    }
  }
}

export default Genre;
