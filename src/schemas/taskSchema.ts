import z from "zod";
import mongoose, { isValidObjectId } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const TaskSchema = z.object({
  _id: z.instanceof(ObjectId),
  title: z.string(),
  description: z.string(),
  status: z.enum(["to-do", "in progress", "blocked", "done"]),
  assignedTo: z
    .array(
      z
        .string()
        .refine((id) => isValidObjectId(id), { message: "Invalid ObjectId" })
    )
    .default([]),
  createdAt: z.date().default(new Date()),
  finishedAt: z.date().nullable().default(null),
});
