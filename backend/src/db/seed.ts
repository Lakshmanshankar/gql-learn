import { db } from "./db";
import * as schema from "./schema";
const users = await db
  .insert(schema.users)
  .values([
    { username: "user1", email: "user1@gmail.com" },
    { username: "user2", email: "user2@gmail.com" },
    { username: "user3", email: "user3@gmail.com" },
    { username: "user4", email: "user4@gmail.com" },
    { username: "user5", email: "user5@gmail.com" },
    { username: "user6", email: "user6@gmail.com" },
    { username: "user7", email: "user7@gmail.com" },
  ])
  .returning();
console.log(`🌱 seeding users complete `);

users.forEach(async (user) => {
  await db
    .insert(schema.tasks)
    .values([
      { task_name: "default_task", status: "not started", userId: user.id },
    ]);
});
console.log(`🌱 default task for users complete `);
