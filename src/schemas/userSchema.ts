import z from "zod";
import { isValidObjectId } from "mongoose";

export const UserSchema = z.object({
  _id: z.string().refine((val) => isValidObjectId(val)),
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6).max(100),
});

export const CreateUserSchema = UserSchema.omit({
  _id: true,
});

export const UpdateUserSchema = CreateUserSchema.partial();
