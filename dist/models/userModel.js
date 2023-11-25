"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const db = new client_1.PrismaClient();
class User {
    constructor(data = {}) {
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
        this.confirmation_token = data.confirmation_token;
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userType = yield db.userType.findFirst({
                where: {
                    name: "Ucenik",
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
    static findUserToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db.user.findFirst({
                    where: {
                        confirmation_token: token,
                    },
                });
                console.log(user);
                if (user) {
                    yield db.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            confirmed: true,
                            email_verified_at: new Date(),
                        },
                    });
                    return user;
                }
                else {
                    throw new Error(`User couldn't be validated: Token not found for token: ${token}`);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("An error occurred during token validation:", error.message);
                }
                else {
                    console.error("An unknown error occurred:", error);
                }
            }
        });
    }
    static getUser(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db.user.findUnique({
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
            if (!user) {
                throw new Error("User not found");
            }
            const lastLoginDate = ((_a = user.logins[0]) === null || _a === void 0 ? void 0 : _a.date) || null;
            return Object.assign(Object.assign({}, user), { lastLoginDate });
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt.hash(this.password, 12);
            const userType = yield db.userType.findFirst({
                where: {
                    name: "Ucenik",
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
                        confirmation_token: this.confirmation_token,
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
    changePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt.hash(newPassword, 12);
                yield db.user.update({
                    where: { id: this.id },
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
    existsAlready() {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield db.user.findFirst({
                where: {
                    OR: [
                        {
                            username: this.username,
                        },
                        {
                            email: this.email,
                        },
                        {
                            JMBG: this.JMBG,
                        },
                    ],
                },
            });
            return !!existingUser;
        });
    }
    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
    hasMatchingUsername() {
        return db.user.findFirst({
            where: {
                username: this.username,
            },
        });
    }
    hasMatchingEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db.user.findFirst({
                where: {
                    email: this.email,
                },
            });
        });
    }
    static hasMatchingId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db.user.findUnique({
                where: {
                    id,
                },
            });
        });
    }
    hasMatchingJMBG() {
        return __awaiter(this, void 0, void 0, function* () {
            return db.user.findFirst({
                where: {
                    JMBG: this.JMBG,
                },
            });
        });
    }
}
exports.default = User;
//# sourceMappingURL=userModel.js.map