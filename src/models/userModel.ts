import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

class User {
  id?: number;
  name: string = "";
  username: string = "";
  email: string;
  password: string;
  JMBG: string = "";

  constructor(data: { name: string; username: string; email: string; password: string; JMBG: string });
  constructor(email: string, password: string);
  constructor(dataOrEmail: any, password?: string) {
    if (typeof dataOrEmail === "string") {
      this.email = dataOrEmail;
      this.password = password || "";
    } else {
      this.username = dataOrEmail.username;
      this.name = dataOrEmail.name;
      this.email = dataOrEmail.email;
      this.password = dataOrEmail.password;
      this.JMBG = dataOrEmail.JMBG;
    }
  }
  async register() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.user.create({
      data: {
        username: this.username,
        name: this.name,
        email: this.email,
        password: hashedPassword,
        JMBG: this.JMBG,
      },
    });
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
