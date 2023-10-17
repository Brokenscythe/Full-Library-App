import { Request, Response } from "express";

interface UserData {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  JMBG: string;
}
interface loginData {
  email: string;
  password: string;
}

export { UserData, loginData };
