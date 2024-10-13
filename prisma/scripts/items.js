const fs = require("node:fs");
const path = require("node:path");
const { faker } = require("@faker-js/faker");

const users = require("../data/users.json");

function createItems() {
  const items = users
    .map((user) => {
      const items = Array.from({ length: 10 }).map(() => {
        return {
          userId: user.id,
          title: faker.food.fruit(),
          price: faker.number.int({ min: 10, max: 200 }),
        };
      });
      return items;
    })
    .flat();

  const filePath = path.join(__dirname, "../data/items.json");
  fs.writeFileSync(filePath, JSON.stringify(items), "utf-8");
}

createItems();
