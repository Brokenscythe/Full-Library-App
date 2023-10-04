import express from 'express';
import { Request, Response, NextFunction } from "express";
import { getAuthorForm, getAllAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor, editAuthor } from '../controllers/authorController';

const router = express.Router();

router.get('/',  getAllAuthors);
router.get('/new-author', getAuthorForm);
router.get('/add',  getAuthorForm);
router.get('/:id', getAuthor);
router.get('/editAutor/:id', editAuthor);
router.post('/',  addAuthor);

router.patch('/:id',  updateAuthor);
router.delete('/:id',  deleteAuthor);

router.use(function (req, res, next) {
  if (req.query._method == "PATCH") {
    req.method = "PATCH";
    req.url = req.path;
  }
  next();
});

router.use(function (req, res, next) {
  if (req.query._method == "DELETE") {
    req.method = "DELETE";
    req.url = req.path;
  }
  next();
});

export default router;