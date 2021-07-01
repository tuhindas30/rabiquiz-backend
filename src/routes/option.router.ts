import express from "express";
import {
  getAllOptions,
  getOptionsByCategoryId,
  getOptionsByQuestionId,
} from "../controllers/option.controller";

const router = express.Router();

router.get("/", getAllOptions);

router.get("/:categoryId", getOptionsByCategoryId);

router.get("/:categoryId/:questionId", getOptionsByQuestionId);

export default router;
