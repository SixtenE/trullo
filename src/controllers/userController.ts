import { Request, Response } from "express";
import User from "../models/User";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/userSchema";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function createUser(req: Request, res: Response) {
  const parsedBody = CreateUserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Bad Request" });
  }

  const existingUser = await User.findOne({ email: parsedBody.data.email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
  try {
    const user = await User.create({
      email: parsedBody.data.email,
      password: hashedPassword,
      name: parsedBody.data.name,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password");
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

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const parsedBody = UpdateUserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, parsedBody.data, {
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

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
