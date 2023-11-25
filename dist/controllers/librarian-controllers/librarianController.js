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
exports.deleteLibrarian = exports.updateLibrarian = exports.addLibrarian = exports.updatePassword = exports.getNewLibrarian = exports.getEditLibrarian = exports.getLibrarian = exports.getAllLibrarians = void 0;
//Models
const librarianModel_1 = __importDefault(require("../../models/librarianModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
//Validation
const validation_1 = __importDefault(require("../../utils/validation"));
const session_flash_1 = __importDefault(require("../../utils/session-flash"));
function getAllLibrarians(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const librarians = yield librarianModel_1.default.getAllLibrarians();
            res.render("bibliotekari/bibliotekari", { librarians: librarians });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllLibrarians = getAllLibrarians;
function getLibrarian(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const librarianId = parseInt(req.params.id);
        let librarian;
        try {
            librarian = yield librarianModel_1.default.getLibrarian(librarianId);
            res.render("bibliotekari/bibliotekarProfile", { librarian: librarian });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getLibrarian = getLibrarian;
function getEditLibrarian(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const librarianId = parseInt(req.params.id);
        console.log(librarianId);
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
            const librarianData = yield librarianModel_1.default.getLibrarian(librarianId);
            console.log(librarianData);
            res.render("bibliotekari/editBibliotekar", { librarian: librarianData, inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getEditLibrarian = getEditLibrarian;
function getNewLibrarian(req, res, next) {
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
            res.render("bibliotekari/noviBibliotekar", { inputData: sessionData });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getNewLibrarian = getNewLibrarian;
function updatePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const librarianId = Number(req.params.id);
        const { pwResetBibliotekar, pw2ResetBibliotekar } = req.body;
        console.log(pw2ResetBibliotekar, pwResetBibliotekar);
        let librarian;
        let newPassLibrarian;
        try {
            librarian = yield userModel_1.default.getUser(librarianId);
            if (!librarian) {
                throw new Error('Could not find user.');
                return;
            }
            newPassLibrarian = new userModel_1.default(librarian);
            yield newPassLibrarian.changePassword(pwResetBibliotekar);
            console.log(librarian);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updatePassword = updatePassword;
function addLibrarian(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { imePrezimeBibliotekar, jmbgBibliotekar, emailBibliotekar, usernameBibliotekar, pwBibliotekar, pw2Bibliotekar, } = req.body;
        const tipKorisnika = req.body.tipKorisnika;
        const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const enteredData = {
            name: imePrezimeBibliotekar,
            username: usernameBibliotekar,
            email: emailBibliotekar,
            password: pwBibliotekar,
            JMBG: jmbgBibliotekar,
            photo: filename,
        };
        if (!validation_1.default.passwordIsConfirmed(pwBibliotekar, pw2Bibliotekar)) {
            const errorMessage = "Please make sure your passwords match.";
            const flashData = Object.assign({ error_message: errorMessage }, enteredData);
            session_flash_1.default.flashDataToSession(req, flashData, function () {
                res.redirect("/noviBibliotekar");
            });
            return;
        }
        try {
            const user = new librarianModel_1.default({
                name: imePrezimeBibliotekar,
                username: usernameBibliotekar,
                email: emailBibliotekar,
                password: pwBibliotekar,
                JMBG: jmbgBibliotekar,
                typeId: tipKorisnika,
                photo: filename,
            });
            yield user.save();
            res.redirect("/bibliotekari");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addLibrarian = addLibrarian;
function updateLibrarian(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const librarianId = parseInt(req.params.id);
        const { imePrezimeBibliotekarEdit, jmbgBibliotekarEdit, emailBibliotekarEdit, usernameBibliotekarEdit, pwBibliotekarEdit, pw2BibliotekarEdit, } = req.body;
        const tipKorisnika = req.body.tipKorisnika;
        const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const enteredData = {
            name: imePrezimeBibliotekarEdit,
            username: usernameBibliotekarEdit,
            email: emailBibliotekarEdit,
            password: pwBibliotekarEdit,
            JMBG: jmbgBibliotekarEdit,
            photo: filename,
        };
        if (!validation_1.default.passwordIsConfirmed(pwBibliotekarEdit, pw2BibliotekarEdit)) {
            session_flash_1.default.flashDataToSession(req, Object.assign({ error_message: "Please make sure your passwords match." }, enteredData), function () {
                res.redirect(`/editBibliotekar/${librarianId}`);
            });
            return;
        }
        try {
            const user = new librarianModel_1.default({
                name: imePrezimeBibliotekarEdit,
                username: usernameBibliotekarEdit,
                email: emailBibliotekarEdit,
                password: pwBibliotekarEdit,
                JMBG: jmbgBibliotekarEdit,
                typeId: tipKorisnika,
                photo: filename,
                id: librarianId,
            });
            console.log(req.file);
            yield user.save();
            res.redirect("/bibliotekari");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateLibrarian = updateLibrarian;
function deleteLibrarian(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const librarianId = parseInt(req.params.id);
        console.log("Deleting librarian with ID:", librarianId);
        let librarian;
        try {
            librarian = new librarianModel_1.default({ id: librarianId });
            yield librarian.delete();
            console.log(librarian);
            res.redirect("/bibliotekari");
            console.log(`Librarian with id ${librarianId} is deleted.`);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteLibrarian = deleteLibrarian;
//# sourceMappingURL=librarianController.js.map