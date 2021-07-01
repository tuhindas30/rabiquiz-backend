import { Schema, model, Model } from "mongoose";
import { Option, OptionArray, OptionItem } from "../types/quiz.types";
const { ObjectId } = Schema.Types;

const OptionItemSchema = new Schema<OptionItem, Model<OptionItem>, OptionItem>({
  label: {
    type: String,
    required: [true, "Cannot add option without a label"],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "Option needs a parameter whether it is correct or not"],
  },
});

const OptionArraySchema = new Schema<
  OptionArray,
  Model<OptionArray>,
  OptionArray
>(
  {
    question: {
      type: ObjectId,
      ref: "Question",
      index: true,
    },
    options: [OptionItemSchema],
  },
  {
    _id: false,
  }
);

const OptionSchema = new Schema<Option, Model<Option>, Option>(
  {
    category: {
      type: ObjectId,
      ref: "Category",
      index: true,
    },
    items: [OptionArraySchema],
  },
  {
    timestamps: true,
  }
);

const Option = model<Option>("Option", OptionSchema);

export { Option };
