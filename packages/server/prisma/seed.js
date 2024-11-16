import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import users from './data/users.json' with { type: 'json' };
import items from './data/items.json' with { type: 'json' };

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
