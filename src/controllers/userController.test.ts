import Request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "..";
import User from "../models/User";

describe("GET /api/users", () => {
  it("should get all users", async () => {
    const response = await Request(app).get("/api/users");

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("email");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).not.toHaveProperty("password");
  });
});

describe("GET /api/users/:id", () => {
  it("should get a user by ID", async () => {
    const validUser = await User.findOne();

    if (!validUser) {
      throw new Error("No valid user found");
    }

    const response = await Request(app).get(
      `/api/users/${validUser._id.toString()}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", validUser._id.toString());
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).not.toHaveProperty("password");
  });

  it("should return 400 for invalid ID", async () => {
    const response = await Request(app).get("/api/users/invalid-id");

    expect(response.status).toBe(400);
  });

  it("should return 404 for non-existing user", async () => {
    const response = await Request(app).get(
      "/api/users/68da5b4c704dc20ff11cbca2"
    );

    expect(response.status).toBe(404);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "Test User",
      email: `${Math.random().toString(36).substring(2, 15)}@example.com`,
      password: "password123",
    };

    const response = await Request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("email", newUser.email);
    expect(response.body).toHaveProperty("name", newUser.name);
    expect(response.body).not.toHaveProperty("password");
  });

  it("should return 400 for missing fields", async () => {
    const response = await Request(app).post("/api/users").send({
      name: "Test User",
    });

    expect(response.status).toBe(400);
  });

  it("should return 409 for duplicate email", async () => {
    const existingUser = await User.findOne();

    if (!existingUser) {
      throw new Error("No existing user found");
    }

    const response = await Request(app).post("/api/users").send({
      name: "Another User",
      email: existingUser.email,
      password: "password123",
    });

    expect(response.status).toBe(409);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete a user by ID", async () => {
    const validUser = await User.findOne();

    if (!validUser) {
      throw new Error("No valid user found");
    }

    const response = await Request(app).delete(
      `/api/users/${validUser._id.toString()}`
    );

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should return 400 for invalid ID", async () => {
    const response = await Request(app).delete("/api/users/invalid-id");

    expect(response.status).toBe(400);
  });

  it("should return 404 for non-existing user", async () => {
    const response = await Request(app).delete(
      "/api/users/68da5b4c704dc20ff11cbca2"
    );

    expect(response.status).toBe(404);
  });
});
