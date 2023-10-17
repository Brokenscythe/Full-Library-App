import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel";

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
    const categoryId = Number(req.params.id);
    try {
      const category = await Category.getCategory(categoryId);
      res.render('kategorije/editKategorija', { category });
    } catch (error) {
      return next(error);
    }
  }

export async function addCategory(req: Request, res:Response, next:NextFunction){
        const name = req.body.category.toString();
        const description = req.body.description.toString();
        const category = new Category(
            name,
            description,
            req.body.icon,
        );
        try{
            await category.save();
            const categories = await Category.getAllCategories();
            console.log(categories);
            res.render('settings/settingsKategorije', { categories : categories });
        }
        catch(error) {
            return next(error);
        }
}

export async function updateCategory(req: Request, res:Response, next:NextFunction){
    const CategoryId = parseInt(req.params.id.split(':')[1]);
    //const CategoryId = parseInt(req.params.id);
    const name = req.body.name.toString();
    console.log(name);
    const description = req.body.description.toString();
    const category = new Category(
        name,
        description,
        req.body.icon,
        CategoryId
    ); 
    try{
        await category.save();
        const categories = await Category.getAllCategories();
        console.log(categories);
        res.render('settings/settingsKategorije', { categories : categories });
    }
    catch(error) {
        return next(error);
    }
}

export async function deleteCategory(req: Request, res:Response, next:NextFunction) {

    const category = new Category("", "", "", Number(req.params.id));
    try{
        await category.delete();
        res.redirect('/settingsKategorije');
    }catch(error) {
        return next(error);
    }
}


  