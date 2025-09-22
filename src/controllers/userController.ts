import { Request, Response } from "express";
import z from "zod";
import User from "../models/User";
import { isValidObjectId } from "mongoose";

const paramsSchema = z.object({
  id: z.string().refine((val) => isValidObjectId(val), {
    message: "Invalid MongoDB ObjectId",
  }),
});

export async function updateUserById(req: Request, res: Response) {
  const parsedParams = paramsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res
      .status(400)
      .json({ message: parsedParams.error.issues[0]?.message });
  }

  if (!parsedParams.success) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const user = await User.findById(parsedParams.data.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: parsedParams.data.id,
  });
}

export async function deleteUserById(req: Request, res: Response) {
  const parsedParams = paramsSchema.safeParse(req.params);

  if (!parsedParams.success) {
    return res
      .status(400)
      .json({ message: parsedParams.error.issues[0]?.message });
  }

  const user = await User.findByIdAndDelete(parsedParams.data.id, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(204).send();
}
