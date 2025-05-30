import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

const prisma = new PrismaClient();

class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingEmail = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const hashedPassword = hashPassword(password);

      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      res.status(201).json({
        message: "register success",
        data: {
          id: user.id,
          name: user.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "BadRequest" };

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) throw { name: "LoginErrorUser" };

      if (!comparePassword(password, user.password)) {
        throw { name: "LoginErrorPass" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const token = signToken(payload);

      res.status(201).json({
        token: token,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}

export default AuthController;
