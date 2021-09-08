import { Schema, model, Model } from "mongoose";
import { Answer, AnswerItem } from "../types/quiz.types";

const { ObjectId } = Schema.Types;

const AnswerItemSchema = new Schema<AnswerItem, Model<AnswerItem>, AnswerItem>({
  question: {
    type: ObjectId,
    required: [true, "Cannot add quiz without a question"],
  },
  answer: ObjectId,
  points: Number,
});

const QuizSchema = new Schema<Answer, Model<Answer>, Answer>(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      index: true,
    },
    quiz: [AnswerItemSchema],
  },
  {
    _id: false,
    timestamps: true,
  }
);

const Answer = model<Answer>("Answer", QuizSchema);

export { Answer };
