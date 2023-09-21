import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Settings {
  id: number;
  reservationExpiry: number;
  returnDeadline: number;
  conflictDeadline: number;
}

export const getSettings = async (): Promise<Settings> => {
  const settings = await prisma.settings.findUnique({
    where: { id: 1 },
  });

  return settings ?? { id: 0, reservationExpiry: 0, returnDeadline: 0, conflictDeadline: 0 };
};

export const updateSettings = async (data: Settings): Promise<Settings> => {
  const settings = await prisma.settings.update({
    where: { id: 1 },
    data,
  });
  return settings ?? { id: 0, reservationExpiry: 0, returnDeadline: 0, conflictDeadline: 0 };
};
