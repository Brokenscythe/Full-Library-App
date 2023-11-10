import express from "express";

import * as BindingController from "../controllers/settings-controllers/bindingController";
import * as CategoryController from "../controllers/settings-controllers/categoryController";
import * as FormatController from "../controllers/settings-controllers/formatController";
import * as GenreController from "../controllers/settings-controllers/genreController";
import * as LetterController from "../controllers/settings-controllers/letterController";
import * as PublisherController from "../controllers/settings-controllers/publisherController";

import configuredMulterMiddleware from "../middlewares/image-upload";

const SettingsRouter = express.Router();

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
SettingsRouter.post("/novaKategorija", configuredMulterMiddleware, CategoryController.addCategory);
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

export default SettingsRouter;
