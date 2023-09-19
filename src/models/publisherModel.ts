import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Publisher {
    id? : number;
    name: string;

    constructor(
        name: string,
        id?: number
    ) {
        this.name = name;
        this.id = id;
    }

    static async getAllPublishers(){
        const publishers = await db.publisher.findMany();
        return publishers.map((publisher) => {
            return new Publisher( publisher.name, publisher.id );
        });
    }

    static async getPublisher( publisherId: number ) {
        return await db.publisher.findUnique({
            where: {
                id: publisherId,
            }
    });
    }

    async save() {
        if(this.id) {
            return await db.publisher.update({
                where: {
                    id: this.id,
                },
                data: {
                    name: this.name
                }
            });
        }
        else {
            return await db.publisher.create({
                data: {
                    name: this.name
                }
            });

        }
    }

    async delete() {
        await db.publisher.delete({
            where: {
                id: this.id
            }
        });
    }
}

export default Publisher;