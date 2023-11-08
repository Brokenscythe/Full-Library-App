// controllers/statisticsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTotalRentedBooks = async (req: Request, res: Response) => {
  try {
    const totalRentedBooks = await prisma.rent.count();
    res.json({ totalRentedBooks });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};

export const getRentedBooksByBookId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  try {
    const rentedBooksByBookId = await prisma.rent.count({
      where: {
        bookId: bookId,
      },
    });

    res.json({ rentedBooksByBookId });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};

export const getAvailableBooksByBookId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  try {
    const availableBooksByBookId = await prisma.book.count({
      where: {
        id: bookId,
        rented_count: 0,
      },
    });

    res.json({ availableBooksByBookId });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};

export const getReservedBooksByBookId = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId, 10);

  try {
    const reservedBooksByBookId = await prisma.reservation.count({
      where: {
        bookId: bookId,
      },
    });

    res.json({ reservedBooksByBookId });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching statistics' });
  }
};

export const getAllStatistics = async (req: Request, res: Response) => {
    try {
      const totalRentedBooks = await prisma.rent.count();
      const rentedBooksByBookId = await prisma.rent.count();
      const availableBooksByBookId = await prisma.book.count();
      const reservedBooksByBookId = await prisma.reservation.count();
      const totalBooks = await prisma.book.count(); //ukupan broj knjiga dodat
  
      res.json({
        totalRentedBooks,
        rentedBooksByBookId,
        availableBooksByBookId,
        reservedBooksByBookId,
        totalBooks,
      });
      console.log(totalBooks)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching statistics' });
    }
  };