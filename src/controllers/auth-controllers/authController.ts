import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { SessionData } from 'express-session';
import { hash } from 'bcryptjs';
import addCsrfToken from "../../middlewares/csrf-token";
const prisma = new PrismaClient();

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Reservation {
  id: number;
  userId: number;
  bookId: number;
  reservation_date: Date;
  user: {
    username: string;
  };
  book: {
    title: string;
  };
}
interface CustomSession {
  userName?: string;
  rememberToken?: string; // Add rememberToken to the SessionData interface
}
// Update the SessionData interface to include rememberToken
declare module 'express-session' {
  interface SessionData {
    userId: string;
    userName?: string;
    rememberToken?: string; // Optional, as it might not be set for all sessions
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Provjeri da li korisnik postoji-odje koristim cisti SQL....volim to...stara skola
  const user = await prisma.$queryRaw`
    SELECT u.id, u.name, u.email, u.password, u.typeId, u.genderId, ug.name AS genderName, ut.name as roleName
    FROM User u
    JOIN UserType ut ON u.typeId = ut.id
    JOIN UserGender ug ON u.genderId = ug.id
    WHERE u.email = ${email}
  `;

  if (!user || !Array.isArray(user) || user.length === 0) {
    return res.render('auth/login', { error: 'Pogresan email ili password' });
  }

  // provjeri da li je password ok
  if (user[0].password !== password) {
    return res.render('auth/login', { error: 'Pogresan email ili password' });
  }
  const reservations = await getReservations();
  console.log('Reservations:', reservations);
  // Update-uj last_login_at and remember_token
  await prisma.user.update({
    where: { id: user[0].id },
    data: {
      last_login_at: new Date(),
      remember_token: (req.session as CustomSession).rememberToken || null,
    },
  });

  // setuj username u sesiji
  (req.session as SessionData).userId = user[0].id;
  (req.session as SessionData).userName = user[0].name;

  res.redirect('/dashboard');
};

export const logout = (req: Request, res: Response) => {
  const customSession = req.session as CustomSession;

  customSession.userName = undefined;
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    // req.flash("success", "Uspjesno ste se izlogovali.");
    res.redirect('/');
  });
};

export const getSignup = (req: Request, res: Response) => {
  res.render('auth/signup');
};

export const postSignup = async (req: Request, res: Response) => {
  const { name, email, password, username, jmbg } = req.body;

  // provjeri je li email vec zauzet
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.render('auth/signup', { error: 'Email je vec u upotrebi' });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        typeId: 1,
        genderId: 1,
        JMBG: jmbg,
        username: username,
      },
    });

    res.redirect('/');
  } catch (error) {
    console.error('Greska u kreiranju korisnika:', error);
    res.status(500).send('Internal Server Error');
  }
};

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
