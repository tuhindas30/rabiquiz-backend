import { Category } from "../models/category.model";
import { Option } from "../models/option.model";
import { Question } from "../models/question.model";
import { HttpError } from "../utils/helper";

const doesCategoryExist = async (categoryId: string) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new HttpError(404, "Category does not exist");
  }
  return category;
};

const findQuestionsByCategoryId = async (categoryId: string) => {
  const categoryQuestions = await Question.findOne({ category: categoryId });
  if (categoryQuestions?.questions.length === 0) {
    throw new HttpError(404, `No questions found category ${categoryId}`);
  }
  return categoryQuestions;
};

const findQuestionById = async (categoryId: string, questionId: string) => {
  const categoryQuestions = await Question.findOne({ category: categoryId });
  const question = categoryQuestions?.questions.find(
    (question) => question._id == questionId
  );

  if (!question) {
    throw new HttpError(404, `No question with id: ${questionId} found`);
  }
  return question;
};

const findOptionsByCategoryId = async (categoryId: string) => {
  const categoryOptions = await Option.findOne({ category: categoryId });
  if (categoryOptions?.items.length === 0) {
    throw new HttpError(404, `No options found for category ${categoryId}`);
  }
  return categoryOptions;
};

const findOptionsByQuestionId = async (
  categoryId: string,
  questionId: string
) => {
  const categoryOptions = await Option.findOne({ category: categoryId });
  const options = categoryOptions?.items.find(
    (item) => item.question == questionId
  );
  if (!options) {
    throw new HttpError(404, `No options found for question ${questionId}`);
  }
  return options;
};

export {
  doesCategoryExist,
  findQuestionsByCategoryId,
  findQuestionById,
  findOptionsByCategoryId,
  findOptionsByQuestionId,
};
