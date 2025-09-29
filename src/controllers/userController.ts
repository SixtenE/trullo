import { Request, Response } from "express";
import User from "../models/User";

export async function getAllUsers(req: Request, res: Response) {
  res.status(200).json({ message: "Get all users" });
}

export async function createUser(req: Request, res: Response) {
  const newUser = {
    name: "New User",
    email: "newuser@example.com",
    password: "securepassword",
  };

  try {
    const user = await User.create(newUser);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Get user with ID: ${id}` });
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Update user with ID: ${id}` });
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  res.status(200).json({ message: `Delete user with ID: ${id}` });
}
