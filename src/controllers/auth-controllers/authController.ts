import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

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

export const createUser = async (name: string, email: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = await db.user.create({
    data: { name, email, password: hashedPassword },
  });
};