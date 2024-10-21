import { PrismaClient } from '@prisma/client';
import express from 'express';

const itemsRouter = express.Router();
const prisma = new PrismaClient();

itemsRouter.get('/', async (req, res) => {
    res.json(
        await prisma.item.findMany({
            where: {
                userId: req.user.id,
            },
        })
    );
});

export default itemsRouter;
