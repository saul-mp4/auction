const fs = require("node:fs");
const path = require("node:path");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

function generate() {
  const users = Array.from({ length: 20 }).map(() => {
    const email = faker.internet.email();
    const password = bcrypt.hashSync(email, +process.env.BCRYPT_SALT);
    return {
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: email,
      password,
    };
  });
  const filePath = path.join(__dirname, "../data/users.json");
  fs.writeFileSync(filePath, JSON.stringify(users), "utf-8");
}

generate();
