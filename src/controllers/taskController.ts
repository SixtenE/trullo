import { Request, Response } from "express";
import Task from "../models/Task";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function createTask(req: Request, res: Response) {
  const newTask = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    status: "to-do",
    assignedTo: null,
  };

  try {
    const task = new Task(newTask);
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function getTaskById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: `Task not found` });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function updateTaskById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: `Task not found` });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function deleteTaskById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid task ID" });
  }

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: `Task not found` });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
