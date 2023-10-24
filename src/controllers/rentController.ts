import { Request, Response, NextFunction } from "express";
import Rent from "../models/rentModel";

export async function getAllRents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const categories = await Rent.getAllRents();
    //res.render()
  } catch (error) {
    return next(error);
  }
}

export async function getRent(req: Request, res: Response, next: NextFunction) {
  const rentId = parseInt(req.params.id.split(":")[1]);
  let rent;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rent = await Rent.getRent(rentId);
    //res.render('kategorije/editKategorija', {category:category});
  } catch (error) {
    return next(error);
  }
}

/* export async function newRent(req: Request, res:Response, next:NextFunction){
        const rent = new Rent(
            bookId,
            borrowUserId,
            rentUserId,
            issue_date,
            return_date,
        ) 
}

export async function updateCategory(req: Request, res:Response, next:NextFunction){
    
}

export async function deleteCategory(req: Request, res:Response, next:NextFunction) {
    
} */
