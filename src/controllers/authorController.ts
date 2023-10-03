import { Request, Response, NextFunction } from "express";
import Author from "../models/authorModel";

export async function getAllAuthors(req: Request, res: Response, next: NextFunction){
    try {
        const authors = await Author.getAllAuthors();
        console.log(authors);
        res.render('autori/autori', { authors : authors }); 
    } catch (error) {
        return next(error);
    }
}

/* export async function getAuthor(req: Request, res:Response, next:NextFunction){
    let authorId = parseInt(req.params.id.split(':')[1]);
    let author;
    try {
        author = await Author.getAuthor(authorId);
        res.render('autorProfile', {author:author});
    }catch(error) {
        return next(error);
    }
} */

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
        res.json({message: "added new author", author: author});
}

export async function updateAuthor(req: Request, res:Response, next:NextFunction){
    let authorId = parseInt(req.params.id.split(':')[1]);
    const author = new Author(
        req.body.nameSurname,
        req.body.photo,
        req.body.biography,
        req.body.wikipedia,
        req.body.id
    );
    try{
        await author.save();
    }
    catch(error) {
        return next(error);
    }
    res.json({message: "author updated", author: author});
}

export async function deleteAuthor(req: Request, res:Response, next:NextFunction) {
    let authorId = parseInt(req.params.id.split(':')[1]);
    let author = new Author("", "", "", "", authorId);
    try{
        author.delete();
    }catch(error) {
        return next(error);
    }
    res.json({
        mesage: "Author deleted"
    });
}