import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

class User {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  JMBG: string;

  constructor({
    name,
    username,
    email,
    password,
    JMBG,
  }: {
    username: string;
    name: string;
    email: string;
    password: string;
    JMBG: string;
  }) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.JMBG = JMBG;
  }
  async signup() {
    const existingUser = await this.hasMatchingJMBG();
    if (existingUser) {
      throw new Error("User with the same JMBG already exists.");
    }
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
  async hasMatchingJMBG() {
    return db.user.findFirst({
      where: {
        JMBG: this.JMBG,
      },
    });
  }
  async existsAlready() {
    const existingUser = (await this.hasMatchingUsername()) || (await this.hasMatchingEmail());
    if (existingUser) {
      return true;
    }
    return false;
  }
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
  hasMatchingEmail() {
    return db.user.findFirst({
      where: {
        email: this.email,
      },
    });
  }
  hasMatchingUsername() {
    return db.user.findFirst({
      where: {
        username: this.username,
      },
    });
  }
}
export default User;
