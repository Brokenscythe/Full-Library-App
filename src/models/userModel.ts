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
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.user.create({
      data: {
        name: this.name,
        username: this.username,
        email: this.email,
        password: hashedPassword,
        JMBG: this.JMBG,
      },
    });
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
}
export default { User };
