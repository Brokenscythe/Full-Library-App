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
exports.deleteAuthor = exports.updateAuthor = exports.addAuthor = exports.getAuthor = exports.getAllAuthors = void 0;
const authorModel_1 = __importDefault(require("../models/authorModel"));
function getAllAuthors(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authors = yield authorModel_1.default.getAllAuthors();
            console.log(authors);
            res.render('autori/autori', { authors: authors });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllAuthors = getAllAuthors;
function getAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let authorId = parseInt(req.params.id.split(':')[1]);
        let author;
        try {
            author = yield authorModel_1.default.getAuthor(authorId);
            res.render('autorProfile', { author: author });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAuthor = getAuthor;
function addAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //let bookId = parseInt(req.params.id.split(':')[1]);
        const author = new authorModel_1.default(req.body.nameSurname, req.body.photo, req.body.biography, req.body.wikipedia);
        try {
            yield author.save();
        }
        catch (error) {
            return next(error);
        }
        res.json({ message: "added new author", author: author });
    });
}
exports.addAuthor = addAuthor;
function updateAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let authorId = parseInt(req.params.id.split(':')[1]);
        const author = new authorModel_1.default(req.body.nameSurname, req.body.photo, req.body.biography, req.body.wikipedia, req.body.id);
        try {
            yield author.save();
        }
        catch (error) {
            return next(error);
        }
        res.json({ message: "author updated", author: author });
    });
}
exports.updateAuthor = updateAuthor;
function deleteAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let authorId = parseInt(req.params.id.split(':')[1]);
        let author = new authorModel_1.default("", "", "", "", authorId);
        try {
            author.delete();
        }
        catch (error) {
            return next(error);
        }
        res.json({
            mesage: "Author deleted"
        });
    });
}
exports.deleteAuthor = deleteAuthor;
//# sourceMappingURL=authorController.js.map