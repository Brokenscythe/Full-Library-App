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
exports.deleteAuthor = exports.updateAuthor = exports.addAuthor = exports.getEditAuthor = exports.getNewAuthor = exports.getAuthor = exports.getAllAuthors = void 0;
const authorModel_1 = __importDefault(require("../../models/authorModel"));
function getAllAuthors(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authors = yield authorModel_1.default.getAllAuthors();
            res.render("autori/autori", { authors: authors });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllAuthors = getAllAuthors;
function getAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorId = parseInt(req.params.id);
        let author;
        try {
            author = yield authorModel_1.default.getAuthor(authorId);
            console.log(author);
            res.render("autori/autorProfile", { authors: [author] });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAuthor = getAuthor;
function getNewAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render("autori/noviAutor");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getNewAuthor = getNewAuthor;
function getEditAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorId = parseInt(req.params.id);
        let author;
        try {
            author = yield authorModel_1.default.getAuthor(authorId);
            res.render("autori/editAutor", { authors: [author] });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getEditAuthor = getEditAuthor;
function addAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { imePrezimeAutor, opisAutor } = req.body;
        let author;
        try {
            author = new authorModel_1.default(imePrezimeAutor, "", opisAutor, "");
            yield author.save();
            res.redirect("/authors");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addAuthor = addAuthor;
function updateAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { imePrezimeAutor, opisAutor } = req.body;
        const authorId = parseInt(req.params.id);
        let author;
        try {
            const existingAuthor = yield authorModel_1.default.getAuthor(authorId);
            author = new authorModel_1.default(imePrezimeAutor, "", opisAutor, "", existingAuthor.created_at, new Date(), authorId);
            yield author.save();
            res.redirect("/authors");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateAuthor = updateAuthor;
function deleteAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorId = parseInt(req.params.id);
        let author;
        try {
            author = new authorModel_1.default("", "", "", "", new Date(), new Date(), authorId);
            author.delete();
            res.redirect("/authors");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteAuthor = deleteAuthor;
//# sourceMappingURL=authorController.js.map