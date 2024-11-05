import express from 'express';
import { prisma } from '../../prisma/client.js';

export const itemRouter = express.Router();

itemRouter.get('/', async (req, res) => {
    res.json(
        await prisma.item.findMany({
            where: {
                userId: req.user.id,
            },
        })
    );
});
