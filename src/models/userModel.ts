import { PrismaClient, User } from '@prisma/client';
import { Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export async function createUser(user: Omit<Prisma.UserCreateInput, 'id'>): Promise<User> {
  const newUser = await prisma.user.create({
    data: user as Prisma.UserCreateInput,
  });
  return newUser;
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });
  return updatedUser;
}

export async function deleteUser(id: string): Promise<User> {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
}

export const getAllUsers = async (options: { type?: boolean; gender?: boolean } = {}) => {
    const users = await prisma.user.findMany({
      include: {
        type: options.type,
        gender: options.gender,
      },
    });
    return users;
  };
  
  //za auth

  export const getUser = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  };