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
const userModel_1 = __importDefault(require("../models/userModel"));
function checkConfirmation(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.uid;
        if (!userId) {
            return res.redirect("/login");
        }
        try {
            const user = yield userModel_1.default.getUser(Number(userId));
            if (!user || !user.confirmed) {
                return res.status(403).redirect("/403");
            }
            next();
        }
        catch (error) {
            console.error("Error checking confirmation:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.default = checkConfirmation;
//# sourceMappingURL=email-verification-check.js.map