import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/client.js';
import { faker } from '@faker-js/faker';

export const authRouter = express.Router();

authRouter.post('/register', async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body;
        const hashed = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                fullName,
            },
        });

        const items = Array.from({ length: 5 }).map(() => {
            return {
                id: faker.string.uuid(),
                userId: user.id,
                title: faker.food.dish(),
                author: faker.person.fullName(),
                collection: faker.food.ethnicCategory(),
            };
        });

        await prisma.item.createMany({
            data: items,
            skipDuplicates: true,
        });

        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
});

authRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                password: true,
            },
        });

        const compare = await bcrypt.compare(password, user.password);

        if (compare) {
            res.status(200).send(
                jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: '3d',
                })
            );
        } else {
            res.status(401).send('Wrong email or password');
        }
    } catch (e) {
        next(e);
    }
});
