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
exports.Binding = void 0;
const client_1 = require("@prisma/client");
const db = new client_1.PrismaClient();
class Binding {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    static getAllBindings() {
        return db.binding.findMany();
    }
    static getBinding(bindingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.binding.findUnique({
                where: {
                    id: bindingId,
                },
            });
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                return yield db.binding.update({
                    where: {
                        id: this.id,
                    },
                    data: {
                        name: this.name,
                    },
                });
            }
            else {
                return yield db.binding.create({
                    data: {
                        name: this.name,
                    },
                });
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                yield db.binding.delete({
                    where: {
                        id: this.id,
                    },
                });
            }
        });
    }
}
exports.Binding = Binding;
exports.default = Binding;
//# sourceMappingURL=bindingModel.js.map