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
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getNewCategory = exports.getCategory = exports.getAllCategories = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
function getAllCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield categoryModel_1.default.getAllCategories();
            console.log(categories);
            res.render("settings/settingsKategorije", { categories: categories });
        }
        catch (error) {
            console.error("Error fetching categories:", error);
            return next();
        }
    });
}
exports.getAllCategories = getAllCategories;
function getCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = parseInt(req.params.id);
        let category;
        try {
            category = yield category.getCategory(categoryId);
            res.render("kategorije/editKategorija", { category: category });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getCategory = getCategory;
function getNewCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("kategorije/novaKategorija");
    });
}
exports.getNewCategory = getNewCategory;
function addCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description } = req.body.toString();
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }
        const iconPath = req.file.filename;
        try {
            const category = new categoryModel_1.default(name, iconPath, description);
            yield category.save();
            res.redirect("/settingsKategorije");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.addCategory = addCategory;
function updateCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, description } = req.body.toString();
        const categoryId = parseInt(req.params.id);
        const iconPath = req.body.icon;
        try {
            const category = new categoryModel_1.default(name, iconPath, description, categoryId);
            yield category.save();
            res.redirect("/settingsKategorije");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = parseInt(req.params.id);
        try {
            const category = new categoryModel_1.default("", "", "", categoryId);
            yield category.delete();
            res.redirect("/settingsKategorije");
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map