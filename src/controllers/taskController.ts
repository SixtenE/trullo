import { Request, Response } from "express";

export async function getAllTasks(req: Request, res: Response) {
  res.status(200).json({ message: "Get all tasks" });
}

export async function createTask(req: Request, res: Response) {
  res.status(201).json({ message: "Create a task" });
}

export async function getTaskById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Get task with ID: ${id}` });
}

export async function updateTaskById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Update task with ID: ${id}` });
}

export async function deleteTaskById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Delete task with ID: ${id}` });
}
