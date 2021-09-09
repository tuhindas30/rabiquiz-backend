import express from "express";
import {
  getAllQuiz,
  getQuizByCategoryId,
  getQuestionById,
} from "../controllers/quiz.controller";

const router = express.Router();

router.get("/", getAllQuiz);

router.get("/:categoryId", getQuizByCategoryId);

router.get("/:categoryId/:questionId", getQuestionById);

export default router;
