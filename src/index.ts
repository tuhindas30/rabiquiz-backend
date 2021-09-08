import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initializeMongoDB } from "./db/db.connect";
import { verifyAnswers } from "./controllers/answer.controller";
import categoryRouter from "./routes/category.router";
import quizRouter from "./routes/quiz.router";
import undefinedRoutesHandler from "./middlewares/undefinedRoutesHandler";
import errorHandler from "./middlewares/errorHandler";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const URI = process.env.MONGODB_URI || "";
const app = express();
app.use(cors());
app.use(bodyParser.json());
initializeMongoDB(URI);

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to RabiQuiz server");
});

app.use("/categories", categoryRouter);
app.use("/quizzes", quizRouter);
app.post("/verify", verifyAnswers);
app.use(undefinedRoutesHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started ar port: ${PORT}`);
});
