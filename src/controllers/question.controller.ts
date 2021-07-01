import { NextFunction, Request, Response } from "express";
import { Question } from "../models/question.model";
import { HttpError } from "../utils/helper";
import {
  doesCategoryExist,
  findQuestionsByCategoryId,
  findQuestionById,
} from "./helper";

const getAllQuestions = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await Question.find({});
    if (questions.length === 0) {
      throw new HttpError(404, "No questions found");
    }
    res.json({
      status: "SUCCESS",
      data: questions,
      message: "Questions found",
    });
  } catch (err) {
    next(err);
  }
};

const getQuestionsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    await doesCategoryExist(categoryId);
    const questions = await findQuestionsByCategoryId(categoryId);
    res.json({
      status: "SUCCESS",
      data: questions,
      message: `Questions of category ${categoryId} found`,
    });
  } catch (err) {
    next(err);
  }
};

const getQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, questionId } = req.params;
  try {
    await doesCategoryExist(categoryId);
    const question = await findQuestionById(categoryId, questionId);
    res.json({
      status: "SUCCESS",
      data: question,
      message: `Question ${questionId} found`,
    });
  } catch (err) {
    next(err);
  }
};

export { getAllQuestions, getQuestionsByCategoryId, getQuestionById };
