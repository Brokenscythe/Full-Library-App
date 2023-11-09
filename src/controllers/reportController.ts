import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// const pdf = require('html-pdf');
//instalirat npm install html-pdf


interface DailyReport {
  bookTitle: string;
  rentals: number;
  reservations: number;
  rentedBy: string;
  reservedBy: string;
}

const prisma = new PrismaClient();

export const generateDailyReport = async (req: Request, res: Response) => {
  try {
    const dailyReport: DailyReport[] = await prisma.$queryRaw`
    SELECT
  book.title AS bookTitle,
  rentUser.name AS rentedBy,
  reservedByUser.name AS reservedBy,
  COUNT(DISTINCT rent.id) AS rentals,
  COUNT(DISTINCT reservation.id) AS reservations
FROM
  book
LEFT JOIN
  rent ON rent.bookId = book.id
LEFT JOIN
  user AS rentUser ON rentUser.id = rent.borrowUserId
LEFT JOIN
  reservation ON reservation.bookId = book.id
LEFT JOIN
  user AS reservedByUser ON reservedByUser.id = reservation.reservationMadeByUserId
WHERE
  rent.return_date >= CURDATE() AND
  reservation.reservation_date >= CURDATE()
GROUP BY
  book.title, rentedBy, reservedBy;

    `;

    res.render("dailyReport", { dailyReport });
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : "Došlo je do nepoznate greške pri generisanju dnevnog izveštaja";
    res.status(500).json({ error: "Došlo je do nepoznate greške pri generisanju dnevnog izveštaja", details: errorMessage });
  }
};

/* 
export const generateDailyReport = async (req: Request, res: Response) => {
    try {
      const dailyReport: DailyReport[] = await prisma.$queryRaw`
        SELECT
  book.title AS bookTitle,
  rentUser.name AS rentedBy,
  reservedByUser.name AS reservedBy,
  COUNT(DISTINCT rent.id) AS rentals,
  COUNT(DISTINCT reservation.id) AS reservations
FROM
  book
LEFT JOIN
  rent ON rent.bookId = book.id
LEFT JOIN
  user AS rentUser ON rentUser.id = rent.borrowUserId
LEFT JOIN
  reservation ON reservation.bookId = book.id
LEFT JOIN
  user AS reservedByUser ON reservedByUser.id = reservation.reservationMadeByUserId
WHERE
  rent.return_date >= CURDATE() AND
  reservation.reservation_date >= CURDATE()
GROUP BY
  book.title, rentedBy, reservedBy;
      `;
  
      const htmlContent = res.render("reports/dailyReport", { dailyReport, currentDate: new Date().toLocaleDateString() });
  
      // opcije za PDF
      const options = { format: 'A4' };
  
      // GENERISI pdf
      pdf.create(htmlContent, options).toBuffer((err, buffer) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error generating PDF" });
        } else {
          // heder za pdf
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline; filename=dailyReport.pdf');
          
          // posalji pdf
          res.send(buffer);
        }
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Došlo je do nepoznate greške pri generisanju dnevnog izveštaja";
      res.status(500).json({ error: "Došlo je do nepoznate greške pri generisanju dnevnog izveštaja", details: errorMessage });
    }
  }; */