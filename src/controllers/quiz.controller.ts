import { NextFunction, Request, Response } from "express";
import { Quiz } from "../models/quiz.model";
import { HttpError } from "../utils/helper";
import {
  doesCategoryExist,
  findQuizByCategoryId,
  findQuestionById,
} from "./helper";

const getAllQuiz = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await Quiz.find({});
    if (quiz.length === 0) {
      throw new HttpError(404, "No quiz found");
    }
    res.json({
      status: "SUCCESS",
      data: quiz,
      message: "Quizzes found",
    });
  } catch (err) {
    next(err);
  }
};

const getQuizByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    await doesCategoryExist(categoryId);
    const quiz = await findQuizByCategoryId(categoryId);
    res.json({
      status: "SUCCESS",
      data: quiz,
      message: `Quiz of category ${categoryId} found`,
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

export { getAllQuiz, getQuizByCategoryId, getQuestionById };
