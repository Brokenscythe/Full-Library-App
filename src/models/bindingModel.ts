import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export class Binding {
    name: string;
    id? : number;

    constructor(
        name: string,
        id?: number
    ) {
        this.name = name;
        this.id = id;
    }

    static async getAllBindings(){
        const bindings = await db.binding.findMany();
        return bindings.map((binding) => {
            return new Binding( binding.name, binding.id );
        });
    }

    static async getBinding( bindingId: number ) {
        return await db.binding.findUnique({
            where: {
                id: bindingId,
            }
    });
    }

    async save() {
        if(this.id) {
            return await db.binding.update({
                where: {
                    id: this.id,
                },
                data: {
                    name: this.name,
                }
            });
        }
        else {
            console.log("called");
            return await db.binding.create({
                data: {
                    name: this.name,
                }
            });

        }
    }

    async delete() {
        await db.binding.delete({
            where: {
                id: this.id
            }
        });
    }
}

export default Binding;