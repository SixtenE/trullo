import Request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "..";
import Task from "../models/Task";

describe("GET /api/tasks", () => {
  it("should get all tasks", async () => {
    const response = await Request(app).get("/api/tasks");

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("status");
    expect(response.body[0]).toHaveProperty("assignedTo");
    expect(response.body[0]).toHaveProperty("finishedAt");
    expect(response.body[0]).toHaveProperty("createdAt");
  });
});

describe("GET /api/tasks/:id", () => {
  it("should get a task by ID", async () => {
    const validTask = await Task.findOne();

    if (!validTask) {
      throw new Error("No valid task found");
    }

    const response = await Request(app).get(
      `/api/tasks/${validTask._id.toString()}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", validTask._id.toString());
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("assignedTo");
    expect(response.body).toHaveProperty("finishedAt");
    expect(response.body).toHaveProperty("createdAt");
  });

  it("should return 404 if task not found", async () => {
    const response = await Request(app).get(
      `/api/tasks/64b64c7f4f1a256e1c8b4567`
    ); // Assuming this ID does not exist

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid ID format", async () => {
    const response = await Request(app).get(`/api/tasks/invalid-id`);

    expect(response.status).toBe(400);
  });
});
