// userLogins.ts

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type UserLoginsCreateInput = {
  userId: number;
  date: Date;
};

class UserLoginsService {
  async logLoginAttempt(userId: number) {
    try {
      const loginAttempt = await db.userLogins.create({
        data: {
          userId,
          date: new Date(),
        } as UserLoginsCreateInput,
      });
      return loginAttempt;
    } catch (error) {
      console.error("Error logging login attempt:", error);
      throw new Error("Failed to log login attempt");
    }
  }
}

export default new UserLoginsService();
