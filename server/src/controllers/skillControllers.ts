import { PrismaClient } from "@prisma/client";

import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

class skillController {
  static async getSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.loginInfo?.userId;

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
      next(error);
    }
  }

  static async addSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.loginInfo?.userId;

      const { name, category, status } = req.body;

      await prisma.skill.create({
        data: {
          name: name,
          category: category,
          status: status,
          userId: Number(userId), // Connect the skill to the user
        },
      });

      res.status(201).json({
        message: "success create skill",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params?.id;
      const userId = req.loginInfo?.userId;

      const { name, category, status } = req.body;

      const skill = await prisma.skill.findUnique({
        where: {
          id: Number(id),
        },
      });

      await prisma.skill.update({
        where: { id: Number(id) },
        data: {
          name,
          category,
          status,
        },
      });

      res.status(201).json({
        message: "skill updated",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default skillController;
