import { faker } from "@faker-js/faker";
import TaskModel from "../models/Task";
import User from "../models/User";

export default async function seed() {
  await Promise.all([User.deleteMany({}), TaskModel.deleteMany({})]);

  const users = Array.from({ length: 12 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }));

  const createdUsers = await User.insertMany(users);

  const tasks = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement([
      "to-do",
      "in progress",
      "blocked",
      "done",
    ]),
    assignedTo: [],
    createdAt: faker.date.recent(),
    finishedAt: null,
  }));

  await TaskModel.insertMany(tasks);
}
