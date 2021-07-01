import { Schema, model, Model } from "mongoose";
import { Question, QuestionItem } from "../types/quiz.types";

const { ObjectId } = Schema.Types;

const QuestionItemSchema = new Schema<
  QuestionItem,
  Model<QuestionItem>,
  QuestionItem
>({
  label: {
    type: String,
    required: [true, "Cannot add question without a label"],
  },
  points: {
    type: Number,
    required: [true, "Cannot add question without its points"],
  },
});

const QuestionSchema = new Schema<Question, Model<Question>, Question>(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      index: true,
    },
    questions: [QuestionItemSchema],
  },
  {
    timestamps: true,
  }
);

const Question = model<Question>("Question", QuestionSchema);

export { Question };
