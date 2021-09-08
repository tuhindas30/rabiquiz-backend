import { Document, PopulatedDoc } from "mongoose";

type RuleItem = {
  _id?: string;
  label: string;
};

export type CategoryItem = {
  _id?: string;
  title: string;
  imageUrl: string;
  description: string;
  rules: RuleItem[];
};

export type OptionItem = {
  _id?: string;
  label: string;
};

export type QuizItem = {
  _id?: string;
  question: string;
  options: OptionItem[];
};

export type AnswerItem = {
  _id?: string;
  question: PopulatedDoc<QuizItem & Document>;
  answer: PopulatedDoc<OptionItem & Document>;
  points: number;
};

export type Quiz = {
  category: PopulatedDoc<CategoryItem & Document>;
  quiz: QuizItem[];
};

export type Answer = {
  category: PopulatedDoc<CategoryItem & Document>;
  quiz: AnswerItem[];
};
