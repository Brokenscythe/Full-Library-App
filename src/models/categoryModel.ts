import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Category {
    id?: number;
    name: string;
    description: string;
    icon: string;

    constructor (
        name: string,
        description: string,
        icon: string,
        id?: number,
    ) {
        this.name = name;
        this.description = description;
        this.icon = icon;
        if (id) {this.id = id;}
    }

    static async getAllCategories() {
        const categories = await db.category.findMany();
        return categories.map((category: any) => {
            return new Category(
                category.name,
                category.description,
                category.icon,
                category.id,
            );
        });
    }

    async save() {
        if(this.id) {
            return await db.category.update({
                where: {
                  id: this.id
                },
                data: {
                  name: this.name,
                  //description: this.description,
                  //icon: this.icon,
                }
            });
        } else {
            return await db.category.create({
              data : {
                  name: this.name,
                  //description: this.description,
                  //icon: this.icon,
              },
            });
        }
    }

    async delete() {
        if (!this.id) {
            throw new Error('Trying to delete a non-existent item');
        }
      
        await db.category.delete({
            where: {
                id: this.id,
            },
        });
    }
}

export default Category;