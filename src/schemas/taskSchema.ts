import z from "zod";
import { isValidObjectId } from "mongoose";

export const TaskSchema = z.object({
  _id: z.string().refine((val) => isValidObjectId(val)),
  title: z.string(),
  description: z.string(),
  status: z.enum(["to-do", "in progress", "blocked", "done"]),
  assignedTo: z
    .string()
    .nullable()
    .refine((val) => {
      if (val === null) return true;
      return isValidObjectId(val);
    })
    .default(null),
  createdAt: z.date().default(new Date()),
  finishedAt: z.date().nullable().default(null),
});

export const CreateTaskSchema = TaskSchema.omit({
  _id: true,
  status: true,
  createdAt: true,
  finishedAt: true,
});

export const UpdateTaskSchema = CreateTaskSchema.partial();
