import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

class SkillController {
  static async getSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.loginInfo;

      if (!userId) throw { name: "Unauthorized" };

      const skills = await prisma.skill.findMany({
        where: {
          userId: Number(userId),
        },
      });

      return res.status(200).json({
        message: "success",
        data: skills,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.loginInfo;
      if (!userId) throw { name: "Unauthorized" };

      const { name, category, status } = req.body;

      await prisma.skill.create({
        data: {
          name,
          category,
          status,
          userId: Number(userId),
        },
      });

      return res.status(201).json({
        message: "success create skill",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params?.id;
      const { userId } = req.loginInfo;

      if (!id || !userId) throw new Error("Invalid request");

      const skill = await prisma.skill.findUnique({
        where: { id: Number(id) },
      });

      if (!skill || skill.userId !== Number(userId)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const { name, category, status } = req.body;

      await prisma.skill.update({
        where: { id: Number(id) },
        data: {
          name,
          category,
          status,
        },
      });

      return res.status(200).json({
        message: "skill updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSkill(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params?.id;
      const { userId } = req.loginInfo;

      if (!id || isNaN(Number(id)) || !userId) {
        throw new Error("Invalid request");
      }

      const skill = await prisma.skill.findUnique({
        where: { id: Number(id) },
      });

      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }

      if (skill.userId !== Number(userId)) {
        return res.status(403).json({ message: "Forbidden: Not your skill" });
      }

      await prisma.skill.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({
        message: "Skill deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SkillController;
