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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = new client_1.PrismaClient();
class Librarian {
    constructor(data) {
        this.name = "";
        this.username = "";
        this.email = "";
        this.password = "";
        this.JMBG = "";
        this.name = data.name || "";
        this.username = data.username || "";
        this.email = data.email || "";
        this.password = data.password || "";
        this.JMBG = data.JMBG || "";
        this.typeId = data.typeId || 1;
        this.photo = data.photo || "";
        this.id = data.id;
    }
    static getAllLibrarians() {
        return __awaiter(this, void 0, void 0, function* () {
            const userType = yield db.userType.findFirst({
                where: {
                    name: "Bibliotekar",
                },
            });
            return db.user.findMany({
                where: {
                    typeId: userType === null || userType === void 0 ? void 0 : userType.id,
                },
                include: {
                    type: true,
                },
            });
        });
    }
    static getLibrarian(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const librarian = yield db.user.findUnique({
                where: {
                    id,
                },
                include: {
                    type: true,
                    logins: {
                        select: {
                            date: true,
                        },
                        orderBy: {
                            date: "desc",
                        },
                        take: 1,
                    },
                },
            });
            if (!librarian) {
                throw new Error("Librarian not found");
            }
            const lastLoginDate = ((_a = librarian.logins[0]) === null || _a === void 0 ? void 0 : _a.date) || null;
            return Object.assign(Object.assign({}, librarian), { lastLoginDate });
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(this.password, 12);
            const userType = yield db.userType.findFirst({
                where: {
                    name: "Bibliotekar",
                },
            });
            if (!userType) {
                throw new Error("User type 'user' not found");
            }
            if (this.id) {
                yield db.user.update({
                    where: {
                        id: this.id,
                    },
                    data: {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: hashedPassword,
                        JMBG: this.JMBG,
                        typeId: userType.id,
                        photo: this.photo,
                        updated_at: new Date(),
                    },
                });
            }
            else {
                yield db.user.create({
                    data: {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: hashedPassword,
                        JMBG: this.JMBG,
                        photo: this.photo,
                        typeId: userType.id,
                        created_at: new Date(),
                        login_count: 0,
                    },
                });
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                yield db.user.delete({
                    where: {
                        id: this.id,
                    },
                });
            }
            else {
                throw new Error("User's id couldn't be found");
            }
        });
    }
    static updateLoginCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.user.update({
                    where: { id: userId },
                    data: {
                        login_count: {
                            increment: 1,
                        },
                    },
                });
            }
            catch (error) {
                console.error("Error updating login count:", error);
                throw new Error("Failed to update login count");
            }
        });
    }
    static updateLastLoginAt(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.user.update({
                    where: { id: userId },
                    data: {
                        last_login_at: new Date(),
                    },
                });
            }
            catch (error) {
                console.error("Error updating last login date:", error);
                throw new Error("Failed to update last login date");
            }
        });
    }
    static changePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!newPassword || newPassword.trim() === "") {
                throw new Error("New password is empty or invalid.");
            }
            try {
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
                yield db.user.update({
                    where: { id: userId },
                    data: {
                        password: hashedPassword,
                    },
                });
            }
            catch (error) {
                console.error("Error changing password:", error);
                throw new Error("Failed to change password");
            }
        });
    }
}
exports.default = Librarian;
//# sourceMappingURL=librarianModel.js.map