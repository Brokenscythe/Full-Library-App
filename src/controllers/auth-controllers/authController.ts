import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { SessionData } from 'express-session';


const prisma = new PrismaClient();

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role:string;
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }}

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
      return res.render('auth/login', { error: 'Invalid email or password' });
    }
  
    // provjeri da li je password ok
    if (user[0].password !== password) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }
  
    // Update-uj last_login_at
    await prisma.user.update({
      where: { id: user[0].id },
      data: { last_login_at: new Date() },
    });
  
    // set kuki za sesiju i redirect
    const sessionData = req.session as SessionData;
    sessionData.userId = user[0].id;
    console.log('Session data:', sessionData); // log podatke o sesiji...nisam siguran
    res.render('dashboard/dashboard', { userName: user[0].name });
  };
  export const logoutUser: (req: Request, res: Response) => void = (req, res) => {
    // Clear the user session
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      // Redirect to the login page or any other page after logout
      res.redirect('/login');
    });
  };
  
  



  
//i ovo bi moglo
 /*  export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const user = await prisma.$queryRaw`
      SELECT u.id, u.name, u.email, u.password, u.typeId, u.genderId, ug.name AS genderName, ut.name as roleName
      FROM User u
      JOIN UserType ut ON u.typeId = ut.id
      JOIN UserGender ug ON u.genderId = ug.id
      WHERE u.email = ${email}
    `;
  
    if (!user || !Array.isArray(user) || user.length === 0) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }
  
    // vidi je li password ok
    if (user[0].password !== password) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }
  
    // Update-uj vrijeme za  last_login_at 
    await prisma.user.update({
      where: { id: user[0].id },
      data: { last_login_at: new Date() },
    });
  
    // Setuj kuki i redirekcija ka odgovarajucim rutama
    const sessionData = req.session as SessionData;
    sessionData.userId = user[0].id;
  
    // Redirekcija bazirana na tipu korisnika...tako mozemo imati X tipova korisnika, sa razlicitim mogucnostima...veoma lako za implement.
    if (user[0].roleName === 'Admin') {
      res.redirect('/admin');
    } else if (user[0].roleName === 'Bibliotekar') {
      res.redirect('/bibliotekar');
    } else if (user[0].roleName === 'Ucenik') {
      res.redirect('/ucenik');
    } else {
      res.redirect('/dashboard');
    }
  }; */
  


export const logout = (req: Request, res: Response) => {
  req.flash("success", "Uspjesno ste se izlogovali.");
  req.session.destroy((err) => {
    
    if (err) {
      console.log(err);
    }
    
    res.redirect('/');
  });
};
