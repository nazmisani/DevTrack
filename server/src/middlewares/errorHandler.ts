import { Request, Response, NextFunction } from "express";

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  let message = "Internal Server Error";
};

export default errorHandler;
