"use strict";
// userLogins.ts
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
const db = new client_1.PrismaClient();
class UserLoginsService {
    logLoginAttempt(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginAttempt = yield db.userLogins.create({
                    data: {
                        userId,
                        date: new Date(),
                    },
                });
                return loginAttempt;
            }
            catch (error) {
                console.error("Error logging login attempt:", error);
                throw new Error("Failed to log login attempt");
            }
        });
    }
}
exports.default = new UserLoginsService();
//# sourceMappingURL=userLogins.js.map