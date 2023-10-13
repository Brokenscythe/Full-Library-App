import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Binding {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }

  static getAllBindings() {
    return db.binding.findMany();
  }

  static async getBinding(bindingId: number) {
    return await db.binding.findUnique({
      where: {
        id: bindingId,
      },
    });
  }

  async save() {
    if (this.id) {
      return await db.binding.update({
        where: {
          id: this.id,
        },
        data: {
          name: this.name,
        },
      });
    } else {
      return await db.binding.create({
        data: {
          name: this.name,
        },
      });
    }
  }

  async delete() {
    if (this.id) {
      await db.binding.delete({
        where: {
          id: this.id,
        },
      });
    }
  }
}

export default Binding;
