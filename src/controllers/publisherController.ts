import { Request, Response, NextFunction } from "express";
import Publisher from "../models/publisherModel";

export async function getAllPublishers(req: Request, res: Response, next: NextFunction){
    try {
        const publishers = await Publisher.getAllPublishers();
        console.log(publishers);
        res.render('settings/settingsIzdavac', { publishers : publishers }); 
    } catch (error) {
        return next(error);
    }
}

 export async function getPublisher(req: Request, res:Response, next:NextFunction){
    const publisherId = parseInt(req.params.id.split(':')[1]);
    let publisher;
    try {
        publisher = await Publisher.getPublisher(publisherId);
        res.render('izdavaci/editIzdavac', {publisher:publisher});
    }catch(error) {
        return next(error);
    }
}

export async function addPublisher(req: Request, res:Response, next:NextFunction){
        const name = req.body.publisher.toString();
        const publisher = new Publisher(
            name
        );
        try{
            await publisher.save();
            const publishers = await Publisher.getAllPublishers();
            console.log(publishers);
            res.render('settings/settingsIzdavac', { publishers : publishers });
        }
        catch(error) {
            return next(error);
        }
}

export async function updatePublisher(req: Request, res:Response, next:NextFunction){
    const publisherId = parseInt(req.params.id.split(':')[1]);
    const name = req.body.publisher.toString();
    const publisher = new Publisher(
        name,
        publisherId
    );
    try{
        await publisher.save();
        const publishers = await Publisher.getAllPublishers();
        console.log(publishers);
        res.render('settings/settingsIzdavac', { publishers : publishers });
    }
    catch(error) {
        return next(error);
    } 
}

export async function deletePublisher(req: Request, res:Response, next:NextFunction) {
    const publisherId = parseInt(req.params.id.split(':')[1]);
    const publisher = new Publisher("", publisherId);
    try{
        await publisher.delete();
        const publishers = await Publisher.getAllPublishers();
        console.log(publishers);
        res.render('settings/settingsIzdavac', { publishers : publishers });
    }catch(error) {
        return next(error);
    }
}