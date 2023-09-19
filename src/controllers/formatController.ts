import { Request, Response, NextFunction } from "express";
import Format from "../models/formatModel";

export async function getAllFormats(req: Request, res: Response, next: NextFunction){
    try {
        const formats = await Format.getAllFormats();
        console.log(formats);
        res.render('settings/settingsFormat', { formats : formats }); 
    } catch (error) {
        return next(error);
    }
} 

 export async function getFormat(req: Request, res:Response, next:NextFunction){
    const formatId = parseInt(req.params.id.split(':')[1]);
    let format;
    try {
        format = await Format.getFormat(formatId);
        res.render('format/editFormat', {format:format});
    }catch(error) {
        return next(error);
    }
} 

export async function addFormat(req: Request, res:Response, next:NextFunction){
        const formatName = req.body.format.toString();
        const format = new Format(formatName);
        try{
            await format.save();
            const formats = await Format.getAllFormats();
            console.log(formats);
            res.render('settings/settingsFormat', { formats : formats });
        }
        catch(error) {
            return next(error);
        }
}

export async function updateFormat(req: Request, res:Response, next:NextFunction){
    const formatId = parseInt(req.params.id.split(':')[1]);
    console.log(formatId);
    const name = req.body.format.toString();
    const format = new Format(
        name,
        formatId
    );
    try{
        await format.save();
        const formats = await Format.getAllFormats();
        console.log(formats);
        res.render('settings/settingsFormat', { formats : formats });
    }
    catch(error) {
        return next(error);
    }
}

export async function deleteFormat(req: Request, res:Response, next:NextFunction) {
    const formatId = parseInt(req.params.id.split(':')[1]);
    const format = new Format("", formatId);
    try{
        format.delete();
        const formats = await Format.getAllFormats();
        console.log(formats);
        res.render('settings/settingsFormat', { formats : formats });
    }catch(error) {
        return next(error);
    }
}