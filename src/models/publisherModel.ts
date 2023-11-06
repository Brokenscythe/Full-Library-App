import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Publisher {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }

  static getAllPublishers() {
    return db.publisher.findMany();
  }

  static async getPublisher(publisherId: number) {
    return await db.publisher.findUnique({
      where: {
        id: publisherId,
      },
    });
  }

  async save() {
    if (this.id) {
      return await db.publisher.update({
        where: {
          id: this.id,
        },
        data: {
          name: this.name,
        },
      });
    } else {
      return await db.publisher.create({
        data: {
          name: this.name,
        },
      });
    }
  }

  async delete() {
    if (this.id) {
      await db.publisher.delete({
        where: {
          id: this.id,
        },
      });
    }
  }
}

export default Publisher;
