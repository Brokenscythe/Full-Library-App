"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class Author {
    constructor(nameSurname, photo, biography, wikipedia, created_at, updated_at, id) {
        this.nameSurname = nameSurname;
        this.photo = photo;
        this.biography = biography;
        this.wikipedia = wikipedia;
        this.created_at = created_at;
        this.updated_at = updated_at;
        if (id) {
            this.id = id;
        }
    }
    static getAllAuthors() {
        return db.author.findMany();
    }
    static getAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = yield db.author.findUnique({
                where: {
                    id,
                },
            });
            if (!author) {
                throw new Error("Author not found");
            }
            return author;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                return yield db.author.update({
                    where: {
                        id: this.id,
                    },
                    data: {
                        nameSurname: this.nameSurname,
                        photo: this.photo,
                        biography: this.biography,
                        wikipedia: this.wikipedia,
                        updated_at: new Date(),
                    },
                });
            }
            else {
                return yield db.author.create({
                    data: {
                        nameSurname: this.nameSurname,
                        photo: this.photo,
                        biography: this.biography,
                        wikipedia: this.wikipedia,
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                });
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                throw new Error("Trying to delete a non-existent author");
            }
            return yield db.author.delete({
                where: {
                    id: this.id,
                },
            });
        });
    }
}
exports.Author = Author;
exports.default = Author;
//# sourceMappingURL=authorModel.js.map