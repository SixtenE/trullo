import { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/taskController";

const router: Router = Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTaskById);

router.delete("/tasks/:id", deleteTaskById);

export default router;
