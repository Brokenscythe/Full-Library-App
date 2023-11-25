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
exports.deletePublisher = exports.updatePublisher = exports.addPublisher = exports.getNewPublisher = exports.getPublisher = exports.getAllPublishers = void 0;
const publisherModel_1 = __importDefault(require("../../models/publisherModel"));
function getAllPublishers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const publishers = yield publisherModel_1.default.getAllPublishers();
            console.log(publishers);
            res.render("settings/settingsIzdavac", { publishers: publishers });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllPublishers = getAllPublishers;
function getPublisher(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const publisherId = parseInt(req.params.id);
        let publisher;
        try {
            publisher = yield publisherModel_1.default.getPublisher(publisherId);
            res.render("izdavaci/editIzdavac", { publisher: publisher });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getPublisher = getPublisher;
function getNewPublisher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("izdavaci/noviIzdavac");
    });
}
exports.getNewPublisher = getNewPublisher;
function addPublisher(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.publisher.toString();
        let publisher;
        try {
            publisher = new publisherModel_1.default(name);
            yield publisher.save();
            res.redirect("/settingsIzdavac");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addPublisher = addPublisher;
function updatePublisher(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const publisherId = parseInt(req.params.id);
        const name = req.body.publisher.toString();
        console.log(publisherId);
        console.log(name);
        try {
            const publisher = new publisherModel_1.default(name, publisherId);
            yield publisher.save();
            res.redirect("/settingsIzdavac");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updatePublisher = updatePublisher;
function deletePublisher(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const publisherId = parseInt(req.params.id);
        console.log("Deleting publisher with ID:", publisherId);
        try {
            const publisher = new publisherModel_1.default("", publisherId);
            yield publisher.delete();
            console.log("Publisher deleted successfully");
            res.redirect("/settingsIzdavac");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deletePublisher = deletePublisher;
//# sourceMappingURL=publisherController.js.map