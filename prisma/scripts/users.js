const fs = require("node:fs");
const path = require("node:path");
const { faker } = require("@faker-js/faker");

function createUsers() {
  const users = Array.from({ length: 20 }).map(() => {
    const email = faker.internet.email();
    return {
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: email,
      password: email,
    };
  });
  const filePath = path.join(__dirname, "../data/users.json");
  fs.writeFileSync(filePath, JSON.stringify(users), "utf-8");
}

createUsers();
