import { NextFunction, Request, Response } from "express";
import { Answer } from "../models/answer.model";
import { HttpError } from "../utils/helper";
import { doesCategoryExist, findAnswerByQuestionId } from "./helper";

const verifyAnswers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, answers } = req.body;
  let score = 0;
  try {
    await doesCategoryExist(categoryId);
    const correctAnswers = await Answer.findOne({
      category: categoryId,
    });
    if (!Array.isArray(answers)) {
      throw new HttpError(400, "answers should be an array");
    }
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      const correctAnswer = await findAnswerByQuestionId(
        categoryId,
        answer.questionId
      );
      if (answer.optionId == correctAnswer.answer) {
        score += correctAnswer.points;
      }
    }
    return res.json({
      status: "SUCCESS",
      data: { score, answers: correctAnswers?.quiz },
      message: "Score calculated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { verifyAnswers };
