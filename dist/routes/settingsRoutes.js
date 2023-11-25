"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BindingController = __importStar(require("../controllers/settings-controllers/bindingController"));
const CategoryController = __importStar(require("../controllers/settings-controllers/categoryController"));
const FormatController = __importStar(require("../controllers/settings-controllers/formatController"));
const GenreController = __importStar(require("../controllers/settings-controllers/genreController"));
const LetterController = __importStar(require("../controllers/settings-controllers/letterController"));
const PublisherController = __importStar(require("../controllers/settings-controllers/publisherController"));
const image_upload_1 = __importDefault(require("../middlewares/image-upload"));
const SettingsRouter = express_1.default.Router();
SettingsRouter.get("/settingsPolisa", (req, res) => {
    res.render("settings/settingsPolisa");
});
SettingsRouter.get("/settings", (req, res) => {
    res.render("settings/settingsPolisa");
});
//GET routes for all...
SettingsRouter.get("/settingsKategorije", CategoryController.getAllCategories);
SettingsRouter.get("/settingsZanrovi", GenreController.getAllGenres);
SettingsRouter.get("/settingsIzdavac", PublisherController.getAllPublishers);
SettingsRouter.get("/settingsPovez", BindingController.getAllbindings);
SettingsRouter.get("/settingsPismo", LetterController.getAllletters);
SettingsRouter.get("/settingsFormat", FormatController.getAllFormats);
//GET routes for edit
SettingsRouter.get("/editKategorija/:id", CategoryController.getCategory);
SettingsRouter.get("/editZanr/:id", GenreController.getGenre);
SettingsRouter.get("/editIzdavac/:id", PublisherController.getPublisher);
SettingsRouter.get("/editPovez/:id", BindingController.getBinding);
SettingsRouter.get("/editPismo/:id", LetterController.getLetter);
SettingsRouter.get("/editFormat/:id", FormatController.getFormat);
//GET routes for creation of new...
SettingsRouter.get("/noviPovez", BindingController.getNewBinding);
SettingsRouter.get("/noviZanr", GenreController.getNewGenre);
SettingsRouter.get("/novaKategorija", CategoryController.getNewCategory);
SettingsRouter.get("/noviIzdavac", PublisherController.getNewPublisher);
SettingsRouter.get("/noviFormat", FormatController.getNewFormat);
SettingsRouter.get("/novoPismo", LetterController.getNewLetter);
//POST routes for creation of new...
SettingsRouter.post("/noviPovez", BindingController.addBinding);
SettingsRouter.post("/novaKategorija", image_upload_1.default, CategoryController.addCategory);
SettingsRouter.post("/noviIzdavac", PublisherController.addPublisher);
SettingsRouter.post("/noviFormat", FormatController.addFormat);
SettingsRouter.post("/novoPismo", LetterController.addLetter);
SettingsRouter.post("/noviZanr", GenreController.addGenre);
//POST routes for updating new...
SettingsRouter.post("/editPovez/:id", BindingController.updateBinding);
SettingsRouter.post("/editKategorija/:id", CategoryController.updateCategory);
SettingsRouter.post("/editFormat/:id", FormatController.updateFormat);
SettingsRouter.post("/editIzdavac/:id", PublisherController.updatePublisher);
SettingsRouter.post("/editPismo/:id", LetterController.updateLetter);
SettingsRouter.post("/editZanr/:id", GenreController.updateGenre);
//DELETE routes...
SettingsRouter.delete("/deletePovez/:id", BindingController.deleteBinding);
SettingsRouter.delete("/deleteKategorija/:id", CategoryController.deleteCategory);
SettingsRouter.delete("/deleteFormat/:id", FormatController.deleteFormat);
SettingsRouter.delete("/deleteIzdavac/:id", PublisherController.deletePublisher);
SettingsRouter.delete("/deletePismo/:id", LetterController.deleteLetter);
SettingsRouter.delete("/deleteZanr/:id", GenreController.deleteGenre);
exports.default = SettingsRouter;
//# sourceMappingURL=settingsRoutes.js.map