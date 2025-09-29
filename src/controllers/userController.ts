import { Request, Response } from "express";

export async function getAllUsers(req: Request, res: Response) {
  res.status(200).json({ message: "Get all users" });
}

export async function createUser(req: Request, res: Response) {
  res.status(201).json({ message: "Create a user" });
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
