import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../index.js";
import { faker } from "@faker-js/faker";

describe("User API", () => {
  it("should update a users name", async () => {
    const userId = faker.database.mongodbObjectId();

    console.log(userId);

    const updatedData = {
      name: Math.random().toString(36).substring(7),
      email: "updated@example.com",
    };

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(userId);
  });
});
