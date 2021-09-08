import { NextFunction, Request, Response } from "express";
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
    if (!Array.isArray(answers)) {
      throw new HttpError(400, "answers should be an array");
    }
    await doesCategoryExist(categoryId);
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
      data: { score },
      message: "Score calculated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export { verifyAnswers };
