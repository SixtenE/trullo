import { faker } from "@faker-js/faker";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export default async function seed() {
  await Promise.all([
    User.deleteMany({}),
    Task.deleteMany({}),
    Project.deleteMany({}),
  ]);

  const users = Array.from({ length: 12 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }));

  const createdUsers = await User.insertMany(users);

  const projects = Array.from({ length: 3 }).map(() => ({
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    members: faker.helpers.arrayElements(
      createdUsers.map((u) => u._id),
      { min: 1, max: createdUsers.length }
    ),
    createdAt: faker.date.recent(),
  }));

  const createdProjects = await Project.insertMany(projects);

  const tasks = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement([
      "to-do",
      "in progress",
      "blocked",
      "done",
    ]),
    assignedTo: faker.helpers.arrayElement(createdUsers.map((u) => u._id)),
    createdAt: faker.date.recent(),
    finishedAt: faker.date.future(),
    project: faker.helpers.arrayElement(createdProjects.map((p) => p._id)),
  }));

  await Task.insertMany(tasks);
}
