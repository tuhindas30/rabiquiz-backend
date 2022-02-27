import { Answer } from "../models/answer.model";
import { Category } from "../models/category.model";
import { Quiz } from "../models/quiz.model";
import { HttpError } from "../utils/helper";

const doesCategoryExist = async (categoryId: string) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new HttpError(404, "Category does not exist");
  }
  return category;
};

const findQuizByCategoryId = async (categoryId: string) => {
  const categoryQuiz = await Quiz.findOne({ category: categoryId });
  if (categoryQuiz?.quiz.length === 0) {
    throw new HttpError(404, `No quiz found for category ${categoryId}`);
  }
  return categoryQuiz;
};

const findQuestionById = async (categoryId: string, questionId: string) => {
  const categoryQuiz = await Quiz.findOne({ category: categoryId });
  const question = categoryQuiz?.quiz.find(
    (question) => question._id == questionId
  );

  if (!question) {
    throw new HttpError(404, `No question with id: ${questionId} found`);
  }
  return question;
};

const findAnswerByQuestionId = async (
  categoryId: string,
  questionId: string
) => {
  const categoryQuiz = await Answer.findOne({ category: categoryId });
  const answer = categoryQuiz?.quiz.find((quiz) => quiz.question == questionId);

  if (!answer) {
    throw new HttpError(404, `No question with id: ${questionId} found`);
  }
  return answer;
};

export {
  doesCategoryExist,
  findQuizByCategoryId,
  findQuestionById,
  findAnswerByQuestionId,
};
