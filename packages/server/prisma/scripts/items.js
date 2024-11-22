import fs from 'node:fs';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import users from '../data/users.json' with { type: 'json' };

function generate() {
    const items = users
        .map((user) => {
            const items = Array.from({ length: 5 }).map(() => {
                return {
                    id: faker.string.uuid(),
                    userId: user.id,
                    title: faker.food.dish(),
                    author: faker.person.fullName(),
                    collection: faker.food.ethnicCategory(),
                };
            });
            return items;
        })
        .flat();

    const filePath = path.join(import.meta.dirname, '../data/items.json');
    fs.writeFileSync(filePath, JSON.stringify(items), 'utf-8');
}

generate();
