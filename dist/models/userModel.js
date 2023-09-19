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
class User {
    constructor({ name, username, email, password, JMBG, }) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.JMBG = JMBG;
    }
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(this.password, 12);
            yield db.user.create({
                data: {
                    username: this.username,
                    name: this.name,
                    email: this.email,
                    password: hashedPassword,
                    JMBG: this.JMBG,
                },
            });
        });
    }
    existsAlready() {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = (yield this.hasMatchingUsername()) || (yield this.hasMatchingEmail());
            if (existingUser) {
                return true;
            }
            return false;
        });
    }
    hasMatchingPassword(hashedPassword) {
        return bcrypt_1.default.compare(this.password, hashedPassword);
    }
    hasMatchingEmail() {
        return db.user.findFirst({
            where: {
                email: this.email,
            },
        });
    }
    hasMatchingUsername() {
        return db.user.findFirst({
            where: {
                username: this.username,
            },
        });
    }
}
exports.default = User;
//# sourceMappingURL=userModel.js.map