import mongoose from "mongoose";

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["to-do", "in progress", "blocked", "done"],
      required: true,
      default: "to-do",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    finishedAt: {
      type: Date,
      default: null,
    },
  })
);

export default Task;
