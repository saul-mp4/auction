import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import users from './data/users.json';
import items from './data/items.json';
import auctions from './data/auctions.json';

async function main() {
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    });
    await prisma.item.createMany({
        data: items,
        skipDuplicates: true,
    });
    await prisma.auction.createMany({
        data: auctions,
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
