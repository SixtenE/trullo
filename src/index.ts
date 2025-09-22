import express, { Response, Request, Application } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import seed from "./utils/seed.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const app: Application = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL as string, { dbName: "trullo" });

app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/api", taskRouter);

app.get("/seed", async (req: Request, res: Response) => {
  await seed();
  res.status(200).json({ message: "👍" });
});

const server = app.listen(PORT, "::", () => {
  console.log(`Server is running at ${JSON.stringify(server.address())}`);
});

export { app };
