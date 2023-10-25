import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getReservations() {
  const reservations = await prisma.$queryRaw`
    SELECT username, title, reservation_date
    FROM reservation
    JOIN user ON user.id = reservation.reservationMadeForUserId
    JOIN book ON book.id = reservation.bookId
    WHERE reservation.reservationMadeByUserId = user.id
    ORDER BY reservation_date DESC
    LIMIT 5
  `;

  return reservations;
}
async function getIssuedBookCount(): Promise<number> {
    const issuedCount = await prisma.$queryRaw<{ 'COUNT(*)': number }>`
      SELECT COUNT(*) as "COUNT(*)"
      FROM reservation, bookstatus
      WHERE bookstatus.status = 'Izdata'
    `;
  
    const count = issuedCount[0]['COUNT(*)'];
  
    return count;
  }
  
  async function getOverdueBookCount(): Promise<number> {
    const overdueCount = await prisma.$queryRaw<{ 'COUNT(*)': number }>`
      SELECT COUNT(*) as "COUNT(*)"
      FROM reservation, bookstatus
      WHERE bookstatus.status = 'Prekoracenje'
    `;
  
    const count = overdueCount[0]['COUNT(*)'];
  
    return count;
  }
  
  
  async function getReservedBookCount(): Promise<number> {
    const reservedCount = await prisma.$queryRaw<{ 'COUNT(*)': number }>`
      SELECT COUNT(*) as "COUNT(*)"
      FROM reservation, reservationstatus
      WHERE reservationstatus.name = 'Rezervisano'
    `;
  
    const count = reservedCount[0]['COUNT(*)'];
  
    return count;
  }
  

export async function getReservationsData(req: Request, res: Response) {
  try {
    const reservations = await getReservations();
    const userName = req.session.userName || ''; 
    const issuedBookCount = await getIssuedBookCount();
    const overdueBookCount = await getOverdueBookCount();
    const reservedBookCount = await getReservedBookCount();
 
 


    res.render('dashboard/dashboard', {
      userName,
      reservations,
      issuedBookCount,
      overdueBookCount,
      reservedBookCount,
    });
  } catch (error) {
   
    console.error('Error fetching reservations:', error);
    res.status(500).send('Internal Server Error');
  }
}
