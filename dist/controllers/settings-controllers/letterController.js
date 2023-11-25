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
exports.deleteLetter = exports.updateLetter = exports.addLetter = exports.getNewLetter = exports.getLetter = exports.getAllletters = void 0;
const letterModel_1 = __importDefault(require("../../models/letterModel"));
function getAllletters(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const letters = yield letterModel_1.default.getAllLetters();
            console.log(letters);
            res.render("settings/settingsPismo", { letters: letters });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllletters = getAllletters;
function getLetter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const letterId = parseInt(req.params.id);
        let letter;
        try {
            letter = yield letterModel_1.default.getLetter(letterId);
            console.log(letter);
            res.render("pismo/editPismo", { letter: letter });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getLetter = getLetter;
function getNewLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("pismo/novoPismo");
    });
}
exports.getNewLetter = getNewLetter;
function addLetter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.letter.toString();
        let letter;
        try {
            letter = new letterModel_1.default(name);
            yield letter.save();
            res.redirect("/settingsPismo");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addLetter = addLetter;
function updateLetter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const letterId = parseInt(req.params.id);
        const name = req.body.letter.toString();
        console.log(letterId);
        console.log(name);
        try {
            const letter = new letterModel_1.default(name, letterId);
            yield letter.save();
            res.redirect("/settingsPismo");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateLetter = updateLetter;
function deleteLetter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const letterId = parseInt(req.params.id);
        console.log("Deleting letter with ID:", letterId);
        try {
            const letter = new letterModel_1.default("", letterId);
            yield letter.delete();
            console.log("Letter deleted successfully");
            res.redirect("/settingsPismo");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteLetter = deleteLetter;
//# sourceMappingURL=letterController.js.map