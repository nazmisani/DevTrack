import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

class TagController {
  static async getTags(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.loginInfo;

      if (!userId) throw { name: "Unauthorized" };

      const tags = await prisma.tag.findMany();

      return res.status(200).json({
        message: "success",
        data: tags,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTagDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.loginInfo;

      if (!userId) throw { name: "Unauthorized" };

      const tag = await prisma.tag.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!tag) throw { name: "NotFound" };

      return res.status(200).json({
        message: "success",
        data: tag,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.loginInfo;
      if (!userId) throw { name: "Unauthorized" };

      const { name } = req.body;

      if (!name) throw { name: "BadRequest" };

      const tag = await prisma.tag.create({
        data: {
          name,
        },
      });

      return res.status(201).json({
        message: "success create tag",
        data: tag,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.loginInfo;

      if (!id || !userId) throw { name: "BadRequest" };

      const tag = await prisma.tag.findUnique({
        where: { id: Number(id) },
      });

      if (!tag) throw { name: "NotFound" };

      const { name } = req.body;

      if (!name) throw { name: "BadRequest" };

      const updatedTag = await prisma.tag.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });

      return res.status(200).json({
        message: "tag updated",
        data: updatedTag,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.loginInfo;

      if (!id || isNaN(Number(id)) || !userId) {
        throw { name: "BadRequest" };
      }

      const tag = await prisma.tag.findUnique({
        where: { id: Number(id) },
      });

      if (!tag) {
        throw { name: "NotFound" };
      }

      await prisma.tag.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({
        message: "Tag deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default TagController;
