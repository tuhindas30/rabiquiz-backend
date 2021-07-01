import express, { Request, Response } from "express";
import cors from "cors";
import { initializeMongoDB } from "./db/db.connect";
import categoryRouter from "./routes/category.router";
import questionRouter from "./routes/question.router";
import optionRouter from "./routes/option.router";
import undefinedRoutesHandler from "./middlewares/undefinedRoutesHandler";
import errorHandler from "./middlewares/errorHandler";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const URI = process.env.MONGODB_URI || "";
const app = express();
app.use(cors());
initializeMongoDB(URI);

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to RabiQuiz server");
});

app.use("/categories", categoryRouter);
app.use("/questions", questionRouter);
app.use("/options", optionRouter);
app.use(undefinedRoutesHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started ar port: ${PORT}`);
});
