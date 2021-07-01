import { NextFunction, Request, Response } from "express";
import { Option } from "../models/option.model";
import { HttpError } from "../utils/helper";
import {
  doesCategoryExist,
  findOptionsByCategoryId,
  findOptionsByQuestionId,
} from "./helper";

const getAllOptions = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const options = await Option.find({});
    if (options.length === 0) {
      throw new HttpError(404, "No options found");
    }
    res.json({
      status: "SUCCESS",
      data: options,
      message: "Options found",
    });
  } catch (err) {
    next(err);
  }
};

const getOptionsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    await doesCategoryExist(categoryId);
    const options = await findOptionsByCategoryId(categoryId);
    res.json({
      status: "SUCCESS",
      data: options,
      message: `Options of category ${categoryId} found`,
    });
  } catch (err) {
    next(err);
  }
};

const getOptionsByQuestionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, questionId } = req.params;
  try {
    await doesCategoryExist(categoryId);
    const question = await findOptionsByQuestionId(categoryId, questionId);
    res.json({
      status: "SUCCESS",
      data: question,
      message: `Options of question ${questionId} found`,
    });
  } catch (err) {
    next(err);
  }
};

export { getAllOptions, getOptionsByCategoryId, getOptionsByQuestionId };
