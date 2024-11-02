import fs from 'node:fs';
import path from 'node:path';
import { faker } from '@faker-js/faker';

import users from '../data/users.json' assert { type: 'json' };
import items from '../data/items.json' assert { type: 'json' };

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

    const filePath = path.join(import.meta.dirname, '../data/auctions.json');
    fs.writeFileSync(filePath, JSON.stringify(auctions), 'utf-8');
}

generate();
