import express from 'express';
import { prisma } from '../../prisma/client.js';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    res.json(
        await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
        })
    );
});
