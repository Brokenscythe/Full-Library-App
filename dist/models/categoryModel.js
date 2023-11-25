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
exports.Category = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class Category {
    constructor(name, iconPath, description, id) {
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
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                return yield db.category.update({
                    where: {
                        id: this.id,
                    },
                    data: {
                        name: this.name,
                        description: this.description,
                        iconPath: this.iconPath,
                    },
                });
            }
            else {
                return yield db.category.create({
                    data: {
                        name: this.name,
                        description: this.description,
                        iconPath: this.iconPath,
                    },
                });
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                throw new Error("Trying to delete a non-existent item");
            }
            yield db.category.delete({
                where: {
                    id: this.id,
                },
            });
        });
    }
}
exports.Category = Category;
exports.default = Category;
//# sourceMappingURL=categoryModel.js.map