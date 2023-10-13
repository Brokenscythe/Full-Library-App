import { Request, Response, NextFunction } from "express";
import Publisher from "../../models/publisherModel";

export async function getAllPublishers(req: Request, res: Response, next: NextFunction) {
  try {
    const publishers = await Publisher.getAllPublishers();
    console.log(publishers);
    res.render("settings/settingsIzdavac", { publishers: publishers });
  } catch (error) {
    return next(error);
  }
}

export async function getPublisher(req: Request, res: Response, next: NextFunction) {
  const publisherId = parseInt(req.params.id);
  let publisher;
  try {
    publisher = await Publisher.getPublisher(publisherId);
    res.render("izdavaci/editIzdavac", { publisher: publisher });
  } catch (error) {
    return next(error);
  }
}
export async function getNewPublisher(req: Request, res: Response) {
  res.render("izdavaci/noviIzdavac");
}
export async function addPublisher(req: Request, res: Response, next: NextFunction) {
  const name = req.body.publisher.toString();
  let publisher;
  try {
    publisher = new Publisher(name);
    await publisher.save();
    res.redirect("/settingsIzdavac");
  } catch (error) {
    return next(error);
  }
}

export async function updatePublisher(req: Request, res: Response, next: NextFunction) {
  const publisherId = parseInt(req.params.id);
  const name = req.body.publisher.toString();
  console.log(publisherId);
  console.log(name);
  try {
    const publisher = new Publisher(name, publisherId);
    await publisher.save();
    res.redirect("/settingsIzdavac");
  } catch (error) {
    return next(error);
  }
}

export async function deletePublisher(req: Request, res: Response, next: NextFunction) {
  const publisherId = parseInt(req.params.id);
  console.log("Deleting publisher with ID:", publisherId);
  try {
    const publisher = new Publisher("", publisherId);
    await publisher.delete();
    console.log("Publisher deleted successfully");
    res.redirect("/settingsIzdavac");
  } catch (error) {
    return next(error);
  }
}
