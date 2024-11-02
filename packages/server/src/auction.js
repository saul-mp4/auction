import { PrismaClient } from '@prisma/client';
import express from 'express';

const auctionRouter = express.Router();
const prisma = new PrismaClient();

auctionRouter.get('/', async (req, res) => {
    const { status } = req.body;
    res.json(
        await prisma.auction.findMany({
            where: {
                userSellerId: req.user.id,
                status,
            },
        })
    );
});

auctionRouter.post('/', async (req, res) => {
    const { title, startTime } = req.body;
    const auction = await prisma.auction.create({
        data: {
            userSellerId: req.user.id,
            title,
            startTime: new Date(startTime),
        },
    });
    res.json(auction);
});

auctionRouter.delete('/', async (req, res, next) => {
    const { id } = req.body;
    try {
        const auctions = await prisma.auction.delete({
            where: {
                id,
            },
        });
        res.status(200).json(auctions);
    } catch (e) {
        next(e);
    }
});

export default auctionRouter;
