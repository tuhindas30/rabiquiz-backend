import { Schema, model, Model } from "mongoose";
import { CategoryItem } from "../types/quiz.types";

const CategorySchema = new Schema<
  CategoryItem,
  Model<CategoryItem>,
  CategoryItem
>(
  {
    title: {
      type: String,
      required: [true, "Cannot add quiz category without a title"],
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Cannot add quiz without a related image"],
    },
    description: {
      type: String,
      required: [true, "Cannot add a quiz without a short description"],
      maxLength: [1000, "Description cannot be more than 1000 characters"],
    },
    rules: [
      {
        label: {
          type: String,
          required: [true, "Cannot add a quiz without rules"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Category = model<CategoryItem>("Category", CategorySchema);

export { Category };
