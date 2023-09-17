import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import User from "../../models/userModel";

const db = new PrismaClient();

export async function getRegister(req: Request, res: Response): Promise<void> {
  res.render("auth/register");
}
export async function getLogIn(req: Request, res: Response): Promise<void> {
  res.render("auth/login");
}
export async function signup(req: Request, res: Response): Promise<void> {}
export async function login(req: Request, res: Response): Promise<void> {}

export const getUser = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
};

// export const createUser = async (name: string, email: string, password: string) => {
//   const hashedPassword = bcrypt.hashSync(password, 8);

//   const user = await db.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//       // You may need to provide default values or omit fields that are not required.
//     },
//   });
// };
