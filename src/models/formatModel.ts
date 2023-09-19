import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Format {
    name: string;
    id? : number; 

    constructor(
        name: string,
        id?: number 
    ) {
        this.name = name;
        this.id = id;
    }

    static async getAllFormats(){
        const formats = await db.format.findMany();
        return formats.map((format) => {
            return new Format( format.name, format.id );
        });
    }
 
    static async getFormat( formatId: number ) {
        return await db.format.findUnique({
            where: {
                id: formatId,
            }
    });
    }

    async save() {
        if(this.id) {
            return await db.format.update({
                where: {
                    id: this.id,
                },
                data: {
                    name: this.name
                }
            });
        }
        else {
            return await db.format.create({
                data: {
                    name: this.name
                }
            });

        }
    }

    async delete() {
        await db.format.delete({
            where: {
                id: this.id
            }
        });
    }
}

export default Format;