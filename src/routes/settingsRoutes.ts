import express from "express";

import * as BindingController from '../controllers/bindingController';
import * as CategoryController from '../controllers/categoryController';
import * as FormatController from '../controllers/formatController';
import * as GenreController from '../controllers/genreController';
import * as LetterController from '../controllers/letterController';
import * as PublisherController from '../controllers/publisherController';
import * as settingsController from '../controllers/settingsController';

const SettingsRouter = express.Router();

SettingsRouter.get('/settings',settingsController.getSettings );

SettingsRouter.post('/settings', settingsController.updateSettings);

SettingsRouter.post('/editKategorija/:id', CategoryController.updateCategory);

SettingsRouter.get('/settingsKategorije', CategoryController.getAllCategories);
SettingsRouter.get('/settingsZanrovi', GenreController.getAllGenres);
SettingsRouter.get('/settingsIzdavac', PublisherController.getAllPublishers);
SettingsRouter.get('/settingsPovez', BindingController.getAllbindings);
SettingsRouter.get('/settingsPismo', LetterController.getAllletters);
SettingsRouter.get('/settingsFormat', FormatController.getAllFormats);


SettingsRouter.get('/editKategorija/:id', CategoryController.getCategory);
SettingsRouter.get('/editZanr/:id', GenreController.getGenre);
SettingsRouter.get('/editIzdavac/:id', PublisherController.getPublisher);
SettingsRouter.get('/editPovez/:id', BindingController.getBinding);
SettingsRouter.get('/editPismo/:id', LetterController.getLetter); 
SettingsRouter.get('/editFormat/:id', FormatController.getFormat);


SettingsRouter.get('/noviPovez', (req, res) => {
    res.render('povez/noviPovez');
});
SettingsRouter.get('/noviZanr', (req, res) => {
    res.render('zanrovi/noviZanr');
});
SettingsRouter.get('/novaKategorija', (req, res) => {
    res.render('kategorije/novaKategorija');
});
SettingsRouter.get('/noviIzdavac', (req, res) => {
    res.render('izdavaci/noviIzdavac');
});
SettingsRouter.get('/noviFormat', (req, res) => {
    res.render('format/noviFormat');
});
SettingsRouter.get('/novoPismo', (req, res) => {
    res.render('pismo/novoPismo');
});

//SettingsRouter.post('/novaKategorija',settingsController.dodajKategoriju);


SettingsRouter.post('/noviPovez',BindingController.addBinding);
SettingsRouter.post('/novaKategorija', CategoryController.addCategory);
SettingsRouter.post('/noviIzdavac', PublisherController.addPublisher);
SettingsRouter.post('/noviFormat', FormatController.addFormat);
SettingsRouter.post('/novoPismo', LetterController.addLetter);
SettingsRouter.post('/noviZanr', GenreController.addGenre);

SettingsRouter.post('/editPovez/:id', BindingController.updateBinding);

SettingsRouter.post('/editFormat/:id', FormatController.updateFormat);
SettingsRouter.post('/editIzdavac/:id', PublisherController.updatePublisher);
SettingsRouter.post('/editPismo/:id', LetterController.updateLetter);
SettingsRouter.post('/editZanr/:id', GenreController.updateGenre);

SettingsRouter.delete("/deletePovez/:id", BindingController.deleteBinding); 
SettingsRouter.get("/deleteKategorija/:id", CategoryController.deleteCategory); //sa get oce bez problema
SettingsRouter.delete("/deleteFormat/:id", FormatController.deleteFormat); 
SettingsRouter.delete("/deleteIzdavac/:id", PublisherController.deletePublisher); 
SettingsRouter.delete("/deletePismo/:id", LetterController.deleteLetter); 
SettingsRouter.delete("/deleteZanr/:id", GenreController.deleteGenre); 

export default SettingsRouter;