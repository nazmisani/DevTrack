import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "Unauthorized") {
    status = 401;
    message = "Unauthorized";
  } else if (err.name === "LoginError") {
    status = 401;
    message = "Invalid email or password";
  } else if (err.name === "BadRequest") {
    status = 400;
    message = "Bad Request";
  } else if (err.name === "Nothing") {
    status = 404;
    message = "Not Found";
  }

  res.status(status).json({ message });
};

export default errorHandler;
