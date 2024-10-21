import fs from 'node:fs';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import users from '../data/users.json';

function generate() {
    const items = users
        .map((user) => {
            const items = Array.from({ length: 10 }).map(() => {
                return {
                    id: faker.string.uuid(),
                    userId: user.id,
                    title: faker.food.fruit(),
                    price: faker.number.int({ min: 10, max: 200 }),
                };
            });
            return items;
        })
        .flat();

    const filePath = path.join(__dirname, '../data/items.json');
    fs.writeFileSync(filePath, JSON.stringify(items), 'utf-8');
}

generate();
