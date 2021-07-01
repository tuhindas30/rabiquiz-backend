import { NextFunction, Request, Response } from "express";
import { Category } from "../models/category.model";
import { HttpError } from "../utils/helper";
import { doesCategoryExist } from "./helper";

const getAllCategories = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      throw new HttpError(404, "No categories found");
    }
    res.json({
      status: "SUCCESS",
      data: categories,
      message: "Categories found",
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await doesCategoryExist(id);
    res.json({
      status: "SUCCESS",
      data: category,
      message: `Category ${id} found`,
    });
  } catch (err) {
    next(err);
  }
};

export { getCategoryById, getAllCategories };
