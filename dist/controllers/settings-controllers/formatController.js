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
exports.deleteFormat = exports.updateFormat = exports.addFormat = exports.getNewFormat = exports.getFormat = exports.getAllFormats = void 0;
const formatModel_1 = __importDefault(require("../../models/formatModel"));
function getAllFormats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formats = yield formatModel_1.default.getAllFormats();
            console.log(formats);
            res.render("settings/settingsFormat", { formats: formats });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllFormats = getAllFormats;
function getFormat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const formatId = parseInt(req.params.id);
        let format;
        try {
            format = yield formatModel_1.default.getFormat(formatId);
            console.log(format);
            res.render("format/editFormat", { format: format });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getFormat = getFormat;
function getNewFormat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("format/noviFormat");
    });
}
exports.getNewFormat = getNewFormat;
function addFormat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.format.toString();
        let format;
        try {
            format = new formatModel_1.default(name);
            yield format.save();
            res.redirect("/settingsFormat");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addFormat = addFormat;
function updateFormat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const formatId = parseInt(req.params.id);
        const name = req.body.format.toString();
        console.log(formatId);
        console.log(name);
        try {
            const format = new formatModel_1.default(name, formatId);
            yield format.save();
            res.redirect("/settingsFormat");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateFormat = updateFormat;
function deleteFormat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const formatId = parseInt(req.params.id);
        console.log("Deleting format with ID:", formatId);
        try {
            const format = new formatModel_1.default("", formatId);
            yield format.delete();
            console.log("Format deleted successfully");
            res.redirect("/settingsFormat");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteFormat = deleteFormat;
//# sourceMappingURL=formatController.js.map