import { PrismaClient } from '@prisma/client';
import express from 'express';

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.get('/', async (req, res) => {
    res.json(
        await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
        })
    );
});

export default userRouter;
