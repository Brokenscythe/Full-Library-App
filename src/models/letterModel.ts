import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Letter {
    id? : number;
    name: string;

    constructor(
        name: string,
        id?: number
    ) {
        this.name = name;
        this.id = id;
    }

    static async getAllLetters(){
        const letters = await db.letter.findMany();
        return letters.map((letter) => {
            return new Letter( letter.name, letter.id );
        });
    }

    static async getLetter( letterId: number ) {
        return await db.letter.findUnique({
            where: {
                id: letterId,
            }
    });
    }

    async save() {
        if(this.id) {
            return await db.letter.update({
                where: {
                    id: this.id,
                },
                data: {
                    name: this.name
                }
            });
        }
        else {
            return await db.letter.create({
                data: {
                    name: this.name
                }
            });

        }
    }

    async delete() {
        await db.letter.delete({
            where: {
                id: this.id
            }
        });
    }
}

export default Letter;