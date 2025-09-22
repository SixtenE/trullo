import { Request, Response, Router } from "express";
import Task from "../models/Task";

const router: Router = Router();

router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
export default router;
