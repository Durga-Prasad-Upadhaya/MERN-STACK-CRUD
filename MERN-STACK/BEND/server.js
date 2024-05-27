import express from "express";
import "dotenv/config";
import userRouter from "./controller/userController.js";
import empRouter from "./controller/employeeController.js";
import { connectDB } from "./repository/dbConnection.js";
import { validateToken } from "./middleware/validateToken.js";
import googleRouter from "./controller/googleController.js";
import mailRouter from "./controller/mailController.js";
import cors from "cors";

connectDB();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/emp", validateToken, empRouter);
app.use("/api/v1/auth", googleRouter);
app.use("/api/v1/email", mailRouter);
app.listen(port);
