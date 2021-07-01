import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/helper";

const undefinedRoutesHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new HttpError(404, "The route doesn't exist");
  next(err);
};

export default undefinedRoutesHandler;
