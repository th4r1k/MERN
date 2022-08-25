import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { logger, logEvents } from "./middleware/logger";
import { connectDB } from "./config/dbConn";
import mongoose from "mongoose";
import router from "./routes/root";
import userRoutes from "./routes/userRoutes";
import aviaryRoutes from "./routes/aviaryRoutes";
import { errorHandler } from "./middleware/errorHandler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(logger);

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", router);
app.use("/users", userRoutes);
app.use("/aviary", aviaryRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.hostname}`, "mongoErrLog.log");
});
