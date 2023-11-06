import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

class User {
  name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  JMBG: string = "";
  typeId?: number;
  photo?: string;
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  email_verified_at?: Date;
  confirmation_token?: string;
  last_login_at?: Date | null;

  constructor(data: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    JMBG?: string;
    typeId?: number;
    photo?: string;
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    confirmation_token?: string;
  }) {
    this.name = data.name || "";
    this.username = data.username || "";
    this.email = data.email || "";
    this.password = data.password || "";
    this.JMBG = data.JMBG || "";
    this.typeId = data.typeId || 1;
    this.photo = data.photo || "";
    this.id = data.id;
  }
  static async getAllUsers() {
    const userType = await db.userType.findFirst({
      where: {
        name: "Ucenik",
      },
    });
    return db.user.findMany({
      where: {
        typeId: userType?.id,
      },
      include: {
        type: true,
      },
    });
  }
  static async getUser(id: number) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        type: true,
        logins: {
          select: {
            date: true,
          },
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const lastLoginDate = user.logins[0]?.date || null;
    return {
      ...user,
      lastLoginDate,
    };
  }
  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const userType = await db.userType.findFirst({
      where: {
        name: "Ucenik",
      },
    });
    if (!userType) {
      throw new Error("User type 'user' not found");
    }
    if (this.id) {
      await db.user.update({
        where: {
          id: this.id,
        },
        data: {
          name: this.name,
          username: this.username,
          email: this.email,
          password: hashedPassword,
          JMBG: this.JMBG,
          typeId: userType.id,
          photo: this.photo,
          updated_at: new Date(),
        },
      });
    } else {
      await db.user.create({
        data: {
          name: this.name,
          username: this.username,
          email: this.email,
          password: hashedPassword,
          JMBG: this.JMBG,
          photo: this.photo,
          typeId: userType.id,
          created_at: new Date(),
          login_count: 0,
        },
      });
    }
  }
  async delete() {
    if (this.id) {
      await db.user.delete({
        where: {
          id: this.id,
        },
      });
    } else {
      throw new Error("User's id couldn't be found");
    }
  }
  static async updateLoginCount(userId) {
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          login_count: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error("Error updating login count:", error);
      throw new Error("Failed to update login count");
    }
  }
  static async updateLastLoginAt(userId) {
    try {
      await db.user.update({
        where: { id: userId },
        data: {
          last_login_at: new Date(),
        },
      });
    } catch (error) {
      console.error("Error updating last login date:", error);
      throw new Error("Failed to update last login date");
    }
  }
  static async changePassword(userId: number, newPassword: string) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await db.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.error("Error changing password:", error);
      throw new Error("Failed to change password");
    }
  }

  async existsAlready() {
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          {
            username: this.username,
          },
          {
            email: this.email,
          },
          {
            JMBG: this.JMBG,
          },
        ],
      },
    });
    return !!existingUser;
  }
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
  hasMatchingUsername() {
    return db.user.findFirst({
      where: {
        username: this.username,
      },
    });
  }
  hasMatchingEmail() {
    return db.user.findFirst({
      where: {
        email: this.email,
      },
    });
  }
  async hasMatchingJMBG() {
    return db.user.findFirst({
      where: {
        JMBG: this.JMBG,
      },
    });
  }
}
export default User;
