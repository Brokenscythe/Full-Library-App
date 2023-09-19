import { Request, Response, NextFunction } from "express";
import Genre from "../models/genreModel";

export async function getAllGenres(req: Request, res: Response, next: NextFunction){
    try {
        const genres = await Genre.getAllGenres();
        console.log(genres);
        res.render('settings/settingsZanrovi', { genres : genres }); 
    } catch (error) {
        return next(error);
    } 
}

export async function getGenre(req: Request, res:Response, next:NextFunction){
    const genreId = parseInt(req.params.id.split(':')[1]);
    let genre;
    try {
        genre = await Genre.getGenre(genreId);
        res.render('zanrovi/editZanr', {genre:genre});
    }catch(error) {
        return next(error);
    }
} 

export async function addGenre(req: Request, res:Response, next:NextFunction){
        const name = req.body.genre.toString();
        const genre = new Genre(
            name
        );
        try{
            await genre.save();
            const genres = await Genre.getAllGenres();
            console.log(genres);
            res.render('settings/settingsZanr', { genres : genres });
        }
        catch(error) {
            return next(error);
        }
}

export async function updateGenre(req: Request, res:Response, next:NextFunction){
    const genreId = parseInt(req.params.id.split(':')[1]);
    const name = req.body.genre.toString();
    const genre = new Genre(
        name,
        genreId
    );
    try{
        await genre.save();
        const genres = await Genre.getAllGenres();
        console.log(genres);
        res.render('settings/settingsZanrovi', { genres : genres });
    }
    catch(error) {
        return next(error);
    }
}

export async function deleteGenre(req: Request, res:Response, next:NextFunction) {
    const genreId = parseInt(req.params.id.split(':')[1]);
    const genre = new Genre("", genreId);
    try{
        await genre.delete();
        const genres = await Genre.getAllGenres();
        console.log(genres);
        res.render('settings/settingsZanrovi', { genres : genres });
    }catch(error) {
        return next(error);
    }
}