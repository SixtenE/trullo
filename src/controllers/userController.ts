import { Request, Response } from "express";
import User from "../models/User";
import z from "zod";
import { CreateTaskSchema } from "../schemas/taskSchema";
import { CreateUserSchema } from "../schemas/userSchema";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function createUser(req: Request, res: Response) {
  const parsedBody = CreateUserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: parsedBody.error });
  }

  //Check if email already exists
  const existingUser = await User.findOne({ email: parsedBody.data.email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }

  try {
    const user = await User.create(parsedBody.data);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
