import { PrismaClient } from '@prisma/client';
import express from 'express';

const auctionRouter = express.Router();
const prisma = new PrismaClient();

auctionRouter.get('/(my)?', async (req, res) => {
    res.json(
        await prisma.auction.findMany({
            where: {
                userSellerId: req.user.id,
            },
        })
    );
});

auctionRouter.get('/others', async (req, res) => {
    res.json(
        await prisma.auction.findMany({
            where: {
                userSellerId: {
                    not: req.user.id,
                },
            },
        })
    );
});

auctionRouter.post('/', async (req, res) => {
    const { title, startTime, endTime, itemId } = req.body;
    const auction = await prisma.auction.create({
        data: {
            title,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            itemId,
            userSellerId: req.user.id,
        },
    });
    res.json(auction);
});

export default auctionRouter;
