import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProjectController {
  static async getProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.loginInfo;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getProjectDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addProject(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default ProjectController;
