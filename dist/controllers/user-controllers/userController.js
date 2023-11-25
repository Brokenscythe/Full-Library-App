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
exports.deleteUser = exports.updateUser = exports.addUser = exports.updatePassword = exports.getNewUser = exports.getEditUser = exports.getUser = exports.getAllUsers = void 0;
//Models
const userModel_1 = __importDefault(require("../../models/userModel"));
//Validation
const validation_1 = __importDefault(require("../../utils/validation"));
const session_flash_1 = __importDefault(require("../../utils/session-flash"));
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.getAllUsers();
            res.render("ucenici/ucenik", { users: users });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        let user;
        try {
            user = yield userModel_1.default.getUser(userId);
            res.render("ucenici/ucenikProfile", { user: user });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUser = getUser;
function getEditUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        console.log(userId);
        try {
            let sessionData = session_flash_1.default.getSessionData(req);
            if (!sessionData) {
                sessionData = {
                    name: "",
                    JMBG: "",
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                };
            }
            const userData = yield userModel_1.default.getUser(userId);
            console.log(userData);
            res.render("ucenici/editUcenik", { user: userData, inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getEditUser = getEditUser;
function getNewUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sessionData = session_flash_1.default.getSessionData(req);
            if (!sessionData) {
                sessionData = {
                    name: "",
                    JMBG: " ",
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                };
            }
            res.render("ucenici/noviUcenik", { inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getNewUser = getNewUser;
function updatePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        const { pwResetUcenik } = req.body;
        let user;
        let newPassUser;
        try {
            user = yield userModel_1.default.getUser(userId);
            if (!user) {
                throw new Error('Could not find user.');
                return;
            }
            newPassUser = new userModel_1.default(user);
            yield newPassUser.changePassword(pwResetUcenik);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updatePassword = updatePassword;
function addUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { imePrezimeUcenik, jmbgUcenik, emailUcenik, usernameUcenik, pwUcenik, pw2Ucenik } = req.body;
        const tipKorisnika = req.body.tipKorisnika;
        const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const enteredData = {
            name: imePrezimeUcenik,
            username: usernameUcenik,
            email: emailUcenik,
            password: pwUcenik,
            JMBG: jmbgUcenik,
            photo: filename,
        };
        if (!validation_1.default.passwordIsConfirmed(pwUcenik, pw2Ucenik)) {
            const errorMessage = "Please make sure your passwords match.";
            const flashData = Object.assign({ error_message: errorMessage }, enteredData);
            session_flash_1.default.flashDataToSession(req, flashData, function () {
                res.redirect("/noviUcenik");
            });
            return;
        }
        try {
            const user = new userModel_1.default({
                name: imePrezimeUcenik,
                username: usernameUcenik,
                email: emailUcenik,
                password: pwUcenik,
                JMBG: jmbgUcenik,
                typeId: tipKorisnika,
                photo: filename,
            });
            yield user.save();
            res.redirect("/ucenik");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addUser = addUser;
function updateUser(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        const { imePrezimeUcenikEdit, jmbgUcenikEdit, emailUcenikEdit, usernameUcenikEdit, pwUcenikEdit, pw2UcenikEdit } = req.body;
        const tipKorisnika = req.body.tipKorisnika;
        const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const enteredData = {
            name: imePrezimeUcenikEdit,
            username: usernameUcenikEdit,
            email: emailUcenikEdit,
            password: pwUcenikEdit,
            JMBG: jmbgUcenikEdit,
            photo: filename,
        };
        if (!validation_1.default.passwordIsConfirmed(pwUcenikEdit, pw2UcenikEdit)) {
            session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Please make sure your passwords match." }, enteredData), function () {
                res.redirect(`/editUcenik/${userId}`);
            });
            return;
        }
        try {
            const user = new userModel_1.default({
                name: imePrezimeUcenikEdit,
                username: usernameUcenikEdit,
                email: emailUcenikEdit,
                password: pwUcenikEdit,
                JMBG: jmbgUcenikEdit,
                typeId: tipKorisnika,
                photo: filename,
                id: userId,
            });
            console.log(req.file);
            yield user.save();
            res.redirect("/ucenik");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        console.log("Deleting user with ID:", userId);
        let user;
        try {
            user = new userModel_1.default({ id: userId });
            yield user.delete();
            console.log(user);
            res.redirect("/ucenik");
            console.log(`User with id ${userId} is deleted.`);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map