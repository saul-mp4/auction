const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const users = require("./data/users.json");
const items = require("./data/items.json");

async function main() {
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
  await prisma.item.createMany({
    data: items,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
