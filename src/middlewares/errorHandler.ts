import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/helper";

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status) {
    err.status = err.name === "UnauthorizedError" ? 401 : 400;
  }
  if (process.env.NODE_ENV !== "production") {
    console.log(err);
  }
  res.status(err.status).json({ status: "ERROR", message: err.message });
};

export default errorHandler;
