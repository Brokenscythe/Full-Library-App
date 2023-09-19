import { Request, Response, NextFunction } from "express";
import Letter from "../models/letterModel";

export async function getAllletters(req: Request, res: Response, next: NextFunction){
    try {
        const letters = await Letter.getAllLetters();
        console.log(letters);
        res.render('settings/settingsPismo', { letters : letters }); 
    } catch (error) {
        return next(error);
    }
}

 export async function getLetter(req: Request, res:Response, next:NextFunction){
    const letterId = parseInt(req.params.id.split(':')[1]);
    let letter;
    try {
        letter = await Letter.getLetter(letterId);
        res.render('pismo/editPismo', {letter:letter});
    }catch(error) {
        return next(error);
    }
}

export async function addLetter(req: Request, res:Response, next:NextFunction){
        const name = req.body.letter.toString();
        const letterId = parseInt(req.params.id.split(':')[1]);
        const letter = new Letter(
            name,
            letterId
        ); 
        try{
            await letter.save();
            const letters = await Letter.getAllLetters();
            console.log(letters);
            res.render('settings/settingsPismo', { letters : letters });
        }
        catch(error) {
            return next(error);
        }
}

export async function updateLetter(req: Request, res:Response, next:NextFunction){
    const letterId = parseInt(req.params.id.split(':')[1]);
    const name = req.body.letter.toString();
    const letter = new Letter(
        name,
        letterId
    );
    try{
        await letter.save();
        const letters = await Letter.getAllLetters();
        console.log(letters);
        res.render('settings/settingsPismo', { letters : letters });
    }
    catch(error) {
        return next(error);
    }
}

export async function deleteLetter(req: Request, res:Response, next:NextFunction) {
    const letterId = parseInt(req.params.id.split(':')[1]);
    const letter = new Letter("", letterId);
    try{
        await letter.delete();
        const letters = await Letter.getAllLetters();
        console.log(letters);
        res.render('settings/settingsPismo', { letters : letters });
    }catch(error) {
        return next(error);
    }
}