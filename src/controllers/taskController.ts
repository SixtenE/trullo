import { Request, Response } from "express";
import Task from "../models/Task";
import mongoose from "mongoose";
import { CreateTaskSchema, UpdateTaskSchema } from "../schemas/taskSchema";
import User from "../models/User";

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function createTask(req: Request, res: Response) {
  const parsedBody = CreateTaskSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const task = await Task.create({
      title: parsedBody.data.title,
      description: parsedBody.data.description,
    });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function getTaskById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function updateTaskById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  const parsedBody = UpdateTaskSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: parsedBody.error });
  }

  if (parsedBody.data.assignedTo) {
    const user = await User.findById(parsedBody.data.assignedTo);
    if (!user) {
      return res.status(400).json({ error: "Assigned user not found" });
    }
  }

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        ...parsedBody.data,
        // If status is being updated to "done", set finishedAt to current date
        // If status is being updated to something else, set finishedAt to null
        // If status is not being updated, leave finishedAt unchanged
        finishedAt: parsedBody.data.status
          ? parsedBody.data.status === "done"
            ? new Date()
            : null
          : undefined,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function deleteTaskById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
