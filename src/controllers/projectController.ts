import z from "zod";

import { Request, Response } from "express";
import Project from "../models/Project";

export async function getUserProjects(req: Request, res: Response) {
  const user_id = "68c2cb004ef201a787caa23f";

  const projects = await Project.find({
    members: user_id,
  });

  res.json(projects);
}

export async function getProjectById(req: Request, res: Response) {
  const parsedParams = z
    .object({
      id: z.string(),
    })
    .safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  const { id } = parsedParams.data;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function updateProject(req: Request, res: Response) {
  const parsedParams = z
    .object({
      id: z.string(),
    })
    .safeParse(req.params);

  if (!parsedParams.success) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  const { id } = parsedParams.data;

  const parsedBody = z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
    .safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const project = await Project.findByIdAndUpdate(id, parsedBody.data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function reorderTasks(req: Request, res: Response) {
  res.status(200).json({ message: "Reorder tasks" });
}
