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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthService = __importStar(require("../controllers/auth-controllers/authController"));
const authRouter = express_1.default.Router();
authRouter.get("/login", AuthService.getLogIn);
authRouter.post("/login", AuthService.login);
authRouter.get("/register", AuthService.getRegister);
authRouter.post("/register", AuthService.signup);
authRouter.post("/logout", AuthService.logout);
authRouter.get("/confirm/:token", AuthService.confirmRegistration);
authRouter.get("/forgot-password", AuthService.getForgotPassword);
authRouter.post("/forgot-password", AuthService.forgotPassword);
authRouter.get("/reset-password/:id/:token", AuthService.getResetPassword);
authRouter.post("/reset-password/:id/:token", AuthService.resetPassword);
authRouter.get("/401", (req, res, next) => {
    res.render("shared/401");
});
authRouter.get("/403", (req, res, next) => {
    res.render("shared/403");
});
authRouter.get("/501", (req, res) => {
    res.render("shared/501");
});
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map