import { Request, Response, NextFunction } from "express";
import Category from "../../models/categoryModel";

export async function getAllCategories(req: Request, res: Response, next: NextFunction){
  try {
      const categories = await Category.getAllCategories();
      console.log(categories);
      res.render('settings/settingsKategorije', { categories : categories }); 
  } catch (error) {
      return next(error);
  }
}

export async function getCategory(req: Request, res: Response, next: NextFunction) {
  const categoryId = parseInt(req.params.id);
  let category;
  try {
    category = await category.getCategory(categoryId);
    res.render("kategorije/editKategorija", { category: category });
  } catch (error) {
    return next(error);
  }
}
export async function getNewCategory(req: Request, res: Response) {
  res.render("kategorije/novaKategorija");
}

export async function addCategory(req: Request, res: Response, next: NextFunction) {
  const { name, description } = req.body.toString();
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  const iconPath = req.file.filename;
  try {
    const category = new Category(name, iconPath, description);
    await category.save();
    res.redirect("/settingsKategorije");
  } catch (error) {
    return next(error);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  const { name, description } = req.body.toString();
  const categoryId = parseInt(req.params.id);
  const iconPath = req.body.icon;
  try {
    const category = new Category(name, iconPath, description, categoryId);
    await category.save();
    res.redirect("/settingsKategorije");
  } catch (error) {
    return next(error);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const categoryId = parseInt(req.params.id);
  try {
    const category = new Category("", "", "", categoryId);
    await category.delete();
    res.redirect("/settingsKategorije");
  } catch (error) {
    return next(error);
  }
}
