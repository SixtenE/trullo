import z from "zod";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const TaskSchema = z.object({
  _id: z.instanceof(ObjectId),
  title: z.string(),
  description: z.string(),
  status: z.enum(["to-do", "in progress", "blocked", "done"]),
  assignedTo: z.instanceof(ObjectId).nullable(),
  createdAt: z.date().default(new Date()),
  finishedAt: z.date().nullable().default(null),
});

export const CreateTaskSchema = TaskSchema.omit({
  _id: true,
  createdAt: true,
  finishedAt: true,
});
