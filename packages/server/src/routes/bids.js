import express from 'express';
import { prisma } from '../../prisma/client.js';

export const bidsRouter = express.Router();

bidsRouter.post('/', async (req, res) => {
    const { price, timeStamp, auctionId, itemId, userId } = req.body;
    const bid = await prisma.bid.create({
        data: {
            price,
            timeStamp: new Date(timeStamp),
            auctionId,
            itemId,
            userId,
        },
    });
    res.json(bid);
});
