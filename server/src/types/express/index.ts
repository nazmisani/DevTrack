import "express";

declare global {
  namespace Express {
    interface Request {
      loginInfo?: {
        email: string;
        name: string;
      };
    }
  }
}
