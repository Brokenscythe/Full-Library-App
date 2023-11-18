import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Category {
  name: string;
  description: string;
  iconPath: string;
  id?: number;

  constructor(name: string, iconPath: string, description: string, id?: number) {
    this.name = name;
    this.iconPath = iconPath;
    this.description = description;
    if (id) {
      this.id = id;
    }
  }

  static getAllCategories() {
    return db.category.findMany();
  }

  async save() {
    if (this.id) {
      return await db.category.update({
        where: {
          id: this.id,
        },
        data: {
          name: this.name,
          description: this.description,
          iconPath: this.iconPath,
        },
      });
    } else {
      return await db.category.create({
        data: {
          name: this.name,
          description: this.description,
          iconPath: this.iconPath,
        },
      });
    }
  }

  async delete() {
    if (!this.id) {
      throw new Error("Trying to delete a non-existent item");
    }

    await db.category.delete({
      where: {
        id: this.id,
      },
    });
  }
}

export default Category;
