import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

async function checkConfirmation(req: Request, res: Response, next: NextFunction) {
  const userId = (req.session as any)?.uid; 

  if (!userId) {
    
    return res.redirect("/login");
  }

  try {
    const user = await User.getUser(userId); 
    if (!user || !user.confirmed) {
      return res.status(403).redirect("/403");
    }   
    next();
  } catch (error) {
    console.error("Error checking confirmation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default checkConfirmation;
