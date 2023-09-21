import { Request, Response,NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import Author from '../models/authorModel';


const prisma = new PrismaClient();

// finckija za ProperCase za ime i prezime autora
function toProperCase(str: string) {
  return str.replace(/\w\S*/g, function(txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// kraj funkcije za ProperCase
export const getAuthorForm = async (req: Request, res: Response) => {
  try {
    res.render('autori/noviAutor');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error add autor');
  }
};

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.getAllAuthors();
    res.render('autori/autori', { authors });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.getAuthor(Number(req.params.id));
    res.render('autori/autorProfile', { author });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error profil');
  }
};

export const editAuthor = async (req: Request, res: Response) => {
    try {
      const author = await Author.getAuthor(Number(req.params.id));
      res.render('autori/editAutor', { author });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };


  export async function addAuthor(req: Request, res:Response, next:NextFunction){
    //let bookId = parseInt(req.params.id.split(':')[1]);
        const author = new Author(
            req.body.nameSurname,
            req.body.photo,
            req.body.biography,
            req.body.wikipedia
        );
        try{
            await author.save();
        }
        catch(error) {
            return next(error);
        }
        res.redirect('/authors');
}

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { nameSurname, photo, biography, wikipedia } = req.body;
    const author = new Author(nameSurname, photo, biography, wikipedia, Number(req.params.id));
    await author.save();
    res.redirect('/authors');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

  
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = new Author('', '', '', '', Number(req.params.id));
    await author.delete();
    res.redirect('/authors');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
