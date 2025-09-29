import z from "zod";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6).max(100),
});

export const CreateUserSchema = UserSchema.omit({
  _id: true,
});
