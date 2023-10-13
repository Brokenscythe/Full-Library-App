import { Request, Response, NextFunction } from "express";
import Format from "../../models/formatModel";

export async function getAllFormats(req: Request, res: Response, next: NextFunction) {
  try {
    const formats = await Format.getAllFormats();
    console.log(formats);
    res.render("settings/settingsFormat", { formats: formats });
  } catch (error) {
    return next(error);
  }
}

export async function getFormat(req: Request, res: Response, next: NextFunction) {
  const formatId = parseInt(req.params.id);
  let format;
  try {
    format = await Format.getFormat(formatId);
    console.log(format);
    res.render("format/editFormat", { format: format });
  } catch (error) {
    return next(error);
  }
}

export async function getNewFormat(req: Request, res: Response) {
  res.render("format/noviFormat");
}

export async function addFormat(req: Request, res: Response, next: NextFunction) {
  const name = req.body.format.toString();
  let format;
  try {
    format = new Format(name);
    await format.save();
    res.redirect("/settingsFormat");
  } catch (error) {
    return next(error);
  }
}

export async function updateFormat(req: Request, res: Response, next: NextFunction) {
  const formatId = parseInt(req.params.id);
  const name = req.body.format.toString();
  console.log(formatId);
  console.log(name);
  try {
    const format = new Format(name, formatId);
    await format.save();
    res.redirect("/settingsFormat");
  } catch (error) {
    return next(error);
  }
}

export async function deleteFormat(req: Request, res: Response, next: NextFunction) {
  const formatId = parseInt(req.params.id);
  console.log("Deleting format with ID:", formatId);
  try {
    const format = new Format("", formatId);
    await format.delete();
    console.log("Format deleted successfully");
    res.redirect("/settingsFormat");
  } catch (error) {
    return next(error);
  }
}
