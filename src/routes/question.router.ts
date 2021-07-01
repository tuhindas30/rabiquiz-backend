import express from "express";
import {
  getAllQuestions,
  getQuestionsByCategoryId,
  getQuestionById,
} from "../controllers/question.controller";

const router = express.Router();

router.get("/", getAllQuestions);

router.get("/:categoryId", getQuestionsByCategoryId);

router.get("/:categoryId/:questionId", getQuestionById);

export default router;
