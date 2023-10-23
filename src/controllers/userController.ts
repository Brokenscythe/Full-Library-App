import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prikaziSveUcenike = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { type: true, gender: true } });
  res.render('ucenici/ucenik', { users });
};
export const prikaziSveBibliotekare = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { type: true, gender: true } });
  const bibliotekari = users.filter(user => user.type.name.toLowerCase() === 'bibliotekar');

  res.render('bibliotekari/bibliotekari', { users: bibliotekari });
};



export const prikaziNovogUcenika = async (req: Request, res: Response) => {
  res.render('ucenici/noviUcenik');
};

export const dodajNovogUcenika = async (req: Request, res: Response) => {
  const {
    typeId,
    genderId, 
    name,
    JMBG,
    email,
    username,
    password,
    photo,
    remember_token,
    email_verified_at,
    last_login_at,
    created_at,
    updated_at,
    login_count,
    active,
  } = req.body;
  const typeIdAsInt = parseInt(typeId, 10); //ovo da izbjegnem string nesretni
  const genderIdAsInt = parseInt(req.body.genderId, 10); //isto
  const user = await prisma.user.create({
    data: {
      typeId: typeIdAsInt,
      genderId: genderIdAsInt,
      name,
      JMBG,
      email,
      username,
      password,
      photo,
      email_verified_at: new Date(),
      last_login_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      login_count: 0,
      active: 1,
      remember_token: req.csrfToken(),
    },
  });

  res.redirect('/user');
};

export const prikaziIzmjenuUcenika = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  res.render('ucenici/editUcenik', { user });
};


export const izmijeniUcenika = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const {
    typeId,
    genderId,
    name,
    JMBG,
    email,
    username,
    password,
    photo,
    remember_token,
    email_verified_at,
    last_login_at,
    created_at,
    updated_at,
    login_count,
    active,
  } = req.body;

  const typeIdAsInt = parseInt(typeId, 10);
  const genderIdAsInt = parseInt(genderId, 10);
  const activeAsInt=parseInt(active,10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      typeId: typeIdAsInt,
      genderId: genderIdAsInt,
      name,
      JMBG,
      email,
      username,
      password,
      photo,
      remember_token,
      email_verified_at: new Date(),
      last_login_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      login_count,
      active: activeAsInt,
    },
  });

  res.redirect('/user');
};


export const obrisiUcenika = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  res.redirect('/ucenici');
};
