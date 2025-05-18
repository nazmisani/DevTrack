import { PrismaClient } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

class skillController {
  static async getSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const skill = prisma.skill.findMany({
        where: {
          userId: Number(userId),
        },
      });

      res.status(201).json({
        data: skill,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async addSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { name, category, status } = req.body;

      res.status(201);
    } catch (error) {
      console.log(error);
    }
  }
}

export default skillController;
