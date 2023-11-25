import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserData } from "../interfaces/userData";


const prisma = new PrismaClient();
declare module "express-session" {
  interface Session {
    userData: UserData | undefined;
  }
}

const message = 'success';
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
      const userData = req.session.userData as UserData || {};
      const userName = userData.username || '';
      const madeByUserPhoto = '/img/user_avatar.jpg'; 
      const madeByUserName: string = 'User Name';
      const title: string = 'naslov';
      const madeForUserName: string='User name';
      const reservation_date = formatirajDatumToDdMmYyyy(new Date());
      const madeByUserId = 1; 
      const madeForUserId = 9; 
      const rezervacijaId=1;
      const id=1;
      
    
      const reservations = await prisma.$queryRaw`
    SELECT
  r.id as rezervacijaId,
  r.id,  -- Include the id column from the reservation table
  r.reservation_date,
  r.request_date,
  u1.id as madeByUserId,
  u1.name as madeByUserName,
  u1.email as madeByUserEmail,
  u1.username as madeByUserUsername,
  u1.photo as madeByUserPhoto,
  u2.id as madeForUserId,
  u2.name as madeForUserName,
  u2.email as madeForUserEmail,
  u2.username as madeForUserUsername,
  u2.photo as madeForUserPhoto,
  b.title as bookTitle  -- Include the title column from the book table
FROM reservation r
JOIN user u1 ON r.reservationMadeByUserId = u1.id
JOIN user u2 ON r.reservationMadeForUserId = u2.id
JOIN book b ON r.bookId = b.id  -- Assuming bookId is the foreign key in reservation
ORDER BY r.reservation_date DESC
LIMIT 5;
    `;
    
const now = new Date();
const reservationDate = new Date(reservation_date); 

const timeDifference = now.getTime() - reservationDate.getTime();
const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
const daysDifference = Math.floor(hoursDifference / 24);


      const issuedBookCount = await getIssuedBookCount();
      const overdueBookCount = await getOverdueBookCount();
      const reservedBookCount = await getReservedBookCount();
  
      res.render('dashboard/dashboard', {
        rezervacijaId,
        userName,
        reservations,
        issuedBookCount,
        overdueBookCount,
        reservedBookCount,
        madeByUserPhoto,
        title,
        madeByUserName, 
        madeForUserName,
        reservation_date,
       madeByUserId, 
        madeForUserId, 
        relativeTime: daysDifference >= 1 ? `${daysDifference} dana prije` : `${hoursDifference} sati prije`,
      });
    } catch (error) {
      console.error('Error fetching reservations:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  export async function getAllActivities(req: Request, res: Response) {
    try {
      const activities = await prisma.$queryRaw`
      SELECT 
      r.id as rezervacijaId,
  r.id,  -- Include the id column from the reservation table
        r.reservation_date,
        r.request_date,
        u1.name as madeByUserName,
        u1.email as madeByUserEmail,
        u1.username as madeByUserUsername,
        u1.photo as madeByUserPhoto,
        u2.name as madeForUserName,
        u2.email as madeForUserEmail,
        u2.username as madeForUserUsername,
        u2.photo as madeForUserPhoto
      FROM reservation r
      JOIN user u1 ON r.reservationMadeByUserId = u1.id
      JOIN user u2 ON r.reservationMadeForUserId = u2.id
      WHERE r.reservationMadeByUserId = u1.id
      ORDER BY r.reservation_date DESC
      LIMIT 35
    `;
    const message = 'success';
      //res.render('dashboard/dashboardAktivnost', { activities });
      res.render('dashboard/dashboardAktivnost',  { activities, message });

    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      await prisma.$disconnect();
    }
  }
  function formatirajDatumToDdMmYyyy(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  }