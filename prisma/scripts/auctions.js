const fs = require("node:fs");
const path = require("node:path");
const { faker } = require("@faker-js/faker");

const users = faker.helpers.arrayElements(require("../data/users.json"), 5);
const items = require("../data/items.json");

function generate() {
  const auctions = users.map((user) => {
    const now = new Date();

    const oneWeek = new Date();
    oneWeek.setDate(now.getDate() + 7);

    const twoWeeks = new Date();
    twoWeeks.setDate(now.getDate() + 14);

    const startTime = faker.date.between({ from: now, to: oneWeek });
    const endTime = faker.date.between({ from: oneWeek, to: twoWeeks });

    const userItems = items.filter((item) => item.userId === user.id);
    return {
      id: faker.string.uuid(),
      title: faker.company.name(),
      startTime,
      endTime,
      itemId: faker.helpers.arrayElement(userItems).id,
      userSellerId: user.id,
    };
  });

  const filePath = path.join(__dirname, "../data/auctions.json");
  fs.writeFileSync(filePath, JSON.stringify(auctions), "utf-8");
}

generate();
