import { PrismaClient } from "@prisma/client/scripts/default-index";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();

class skillController {
  static async addSkill(req: Request, res: Response, next: NextFunction) {}
}
