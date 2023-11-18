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
exports.login = exports.signup = exports.getLogIn = exports.getRegister = void 0;
const client_1 = require("@prisma/client");
// Models
const userModel_1 = __importDefault(require("../../models/userModel"));
// Utils
const validation_1 = __importDefault(require("../../utils/validation"));
const session_flash_1 = __importDefault(require("../../utils/session-flash"));
const db = new client_1.PrismaClient();
function getRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sessionData = session_flash_1.default.getSessionData(req);
            console.log(sessionData);
            if (!sessionData) {
                sessionData = {
                    username: "",
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    JMBG: "",
                };
            }
            res.render("auth/register", { inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getRegister = getRegister;
function getLogIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let sessionData = session_flash_1.default.getSessionData(req);
        if (!sessionData) {
            sessionData = {
                email: "",
                password: "",
            };
        }
        res.render("auth/login", { inputData: sessionData });
    });
}
exports.getLogIn = getLogIn;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const enteredData = {
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body["confirm_password"],
                JMBG: req.body.jmbg,
            };
            const newUser = new userModel_1.default({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                JMBG: req.body.jmbg,
            });
            const existsAlready = yield newUser.existsAlready();
            if (existsAlready) {
                session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "User already exists! Please check your username and email!" }, enteredData), function () {
                    res.redirect("/register");
                });
                if (!validation_1.default.userDetailsAreValid(req.body.username, req.body.name, req.body.email, req.body.password)) {
                    session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Please check your input. Password must be at least 6 characters long and username 4!" }, enteredData), function () {
                        res.redirect("/signup");
                    });
                    return;
                }
                if (!validation_1.default.passwordIsConfirmed(req.body.password, req.body["confirm_password"])) {
                    session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Please make sure your passwords match." }, enteredData), function () {
                        res.redirect("/signup");
                    });
                    return;
                }
            }
            yield newUser.signup();
        }
        catch (error) {
            console.error("Error during signup:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.login = login;
//# sourceMappingURL=authController.js.map