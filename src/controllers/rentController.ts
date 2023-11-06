import { Request, Response, NextFunction } from "express";
import Rent from "../models/rentModel";

export async function getAllRents(req: Request, res: Response, next: NextFunction) {
  try {
    const rents = await Rent.getAllRents();
    res.status(200).json({
      status: 'success',
      data: {
        rents
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getRent(req: Request, res: Response, next: NextFunction) {
  try {
    const rentId = parseInt(req.params.id);
    const rent = await Rent.getRent(rentId);
    res.status(200).json({
      status: 'success',
      data: {
        rent
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function newRent(req: Request, res: Response, next: NextFunction) {
  try {
    const newRent = new Rent(
      req.body.book,
      req.body.bookId,
      req.body.rentUser,
      req.body.rentUserId,
      req.body.borrowUser,
      req.body.borrowUserId,
      req.body.rentStatus,
      req.body.rentStatusId,
      req.body.issue_date,
      req.body.return_date,
    );
    await newRent.save();
    res.status(201).json({
      status: 'success',
      data: {
        rent: newRent
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRent(req: Request, res: Response, next: NextFunction) {
  try {
    const rentId = parseInt(req.params.id);
    const rent = await Rent.getRent(rentId);
    if (!rent) {
      throw new Error('Rent not found');
    }
    rent.book = req.body.book;
    rent.bookId = req.body.bookId;
    rent.rentUser = req.body.rentUser;
    rent.rentUserId = req.body.rentUserId;
    rent.borrowUser = req.body.borrowUser;
    rent.borrowUserId = req.body.borrowUserId;
    rent.rentStatus = req.body.rentStatus;
    rent.rentStatusId = req.body.rentStatusId;
    rent.issue_date = req.body.issue_date;
    rent.return_date = req.body.return_date;
    await rent.save();
    res.status(200).json({
      status: 'success',
      data: {
        rent
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteRent(req: Request, res: Response, next: NextFunction) {
  try {
    const rentId = parseInt(req.params.id);
    const rent = await Rent.getRent(rentId);
    if (!rent) {
      throw new Error('Rent not found');
    }
    await rent.delete();
    res.status(200).json({
      status: 'success',
      message: 'Rent deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

export async function searchRent(req: Request, res: Response, next: NextFunction) {
  try {
    const searchTerm = req.query.term;
    if (typeof searchTerm !== 'string') {
      throw new Error('Search term must be a string');
    }
    const rents = await Rent.search(searchTerm);
    res.status(200).json({
      status: 'success',
      data: {
        rents
      }
    });
  } catch (error) {
    next(error);
  }
}