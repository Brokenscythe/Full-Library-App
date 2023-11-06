import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Format {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }

  static getAllFormats() {
    return db.format.findMany();
  }

  static async getFormat(formatId: number) {
    return await db.format.findUnique({
      where: {
        id: formatId,
      },
    });
  }

  async save() {
    if (this.id) {
      return await db.format.update({
        where: {
          id: this.id,
        },
        data: {
          name: this.name,
        },
      });
    } else {
      return await db.format.create({
        data: {
          name: this.name,
        },
      });
    }
  }

  async delete() {
    if (this.id) {
      await db.format.delete({
        where: {
          id: this.id,
        },
      });
    }
  }
}

export default Format;
