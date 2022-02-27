import { Schema, model, Model } from "mongoose";
import { OptionItem, Quiz, QuizItem } from "../types/quiz.types";

const { ObjectId } = Schema.Types;

const OptionItemSchema = new Schema<OptionItem, Model<OptionItem>, OptionItem>({
  label: {
    type: String,
    required: [true, "Cannot add quiz without its options"],
  },
});

const QuizItemSchema = new Schema<QuizItem, Model<QuizItem>, QuizItem>({
  question: {
    type: String,
    required: [true, "Cannot add quiz without a question"],
  },
  options: [OptionItemSchema],
});

const QuizSchema = new Schema<Quiz, Model<Quiz>, Quiz>(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      index: true,
    },
    quiz: [QuizItemSchema],
  },
  {
    _id: false,
    timestamps: true,
  }
);

const Quiz = model<Quiz>("Quiz", QuizSchema);

export { Quiz };
