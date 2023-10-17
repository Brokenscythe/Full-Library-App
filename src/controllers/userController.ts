import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../models/userModel';

export const prikaziSveUcenike = async (req: Request, res: Response) => {
    const users = await getAllUsers({ type: true, gender: true });
    res.render('ucenici/ucenik', { users });
  };
  

export const prikaziNovogUcenika = async (req: Request, res: Response) => {
  res.render('ucenici/noviUcenik');
};

export const dodajNovogUcenika = async (req: Request, res: Response) => {
    const { imePrezimeUcenik, jmbgUcenik, emailUcenik, usernameUcenik, pwUcenik } = req.body;
    const newUser: Omit<User, 'id'> = {
        name: imePrezimeUcenik,
        JMBG: jmbgUcenik,
        email: emailUcenik,
        username: usernameUcenik,
        password: pwUcenik,
        typeId: 1,
        genderId: 1,
        photo: '',
        remember_token: '',
        email_verified_at: new Date(),
        last_login_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        login_count: 0,
        active: 0
    };
    await createUser(newUser);
    res.redirect('/user');
  };
export const prikaziIzmjenuUcenika = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserById(userId);
  res.render('ucenici/editUcenik', { user });
};

export const izmijeniUcenika = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { imePrezimeUcenik, jmbgUcenik, emailUcenik, usernameUcenik, pwUcenik } = req.body;
  const updatedUser: Partial<User> = {
    name: imePrezimeUcenik,
    JMBG: jmbgUcenik,
    email: emailUcenik,
    username: usernameUcenik,
    password: pwUcenik,
  };
  await updateUser(userId, updatedUser);
  res.redirect('/ucenici');
};

export const obrisiUcenika = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await deleteUser(userId);
  res.redirect('/ucenici');
};
