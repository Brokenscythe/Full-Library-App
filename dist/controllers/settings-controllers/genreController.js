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
exports.deleteGenre = exports.updateGenre = exports.addGenre = exports.getNewGenre = exports.getGenre = exports.getAllGenres = void 0;
const genreModel_1 = __importDefault(require("../../models/genreModel"));
function getAllGenres(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const genres = yield genreModel_1.default.getAllGenres();
            console.log(genres);
            res.render("settings/settingsZanrovi", { genres: genres });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllGenres = getAllGenres;
function getGenre(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const genreId = parseInt(req.params.id.split(":")[1]);
        let genre;
        try {
            genre = yield genreModel_1.default.getGenre(genreId);
            res.render("zanrovi/editZanr", { genre: genre });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getGenre = getGenre;
function getNewGenre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("zanrovi/noviZanr");
    });
}
exports.getNewGenre = getNewGenre;
function addGenre(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.genre.toString();
        let genre;
        try {
            genre = new genreModel_1.default(name);
            yield genre.save();
            res.redirect("/settingsZanrovi");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addGenre = addGenre;
function updateGenre(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const genreId = parseInt(req.params.id);
        const name = req.body.genre.toString();
        console.log(genreId);
        console.log(name);
        try {
            const genre = new genreModel_1.default(name, genreId);
            yield genre.save();
            res.redirect("/settingsZanrovi");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateGenre = updateGenre;
function deleteGenre(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const genreId = parseInt(req.params.id);
        console.log("Deleting genre with ID:", genreId);
        try {
            const genre = new genreModel_1.default("", genreId);
            yield genre.delete();
            res.redirect("/settingsZanrovi");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteGenre = deleteGenre;
//# sourceMappingURL=genreController.js.map