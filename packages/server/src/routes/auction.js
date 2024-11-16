import express from 'express';

import { prisma } from '../../prisma/client.js';
import { auctinonQueue } from '../bull.js';

export const auctionRouter = express.Router();

auctionRouter.get('/', async (req, res) => {
    const { status } = req.body;
    const user = req.user;
    res.json(
        await prisma.auction.findMany({
            where: {
                userSellerId: user.id,
                status,
            },
        })
    );
});

auctionRouter.get('/browse', async (req, res) => {
    const { status } = req.body;
    const user = req.user;
    res.json(
        await prisma.auction.findMany({
            where: {
                userSellerId: { not: user.id },
                status,
            },
            include: {
                userSeller: {
                    select: {
                        fullName: true,
                    },
                },
            },
        })
    );
});

auctionRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.json(
        await prisma.auction.findUnique({
            where: {
                id,
            },
        })
    );
});

auctionRouter.post('/', async (req, res) => {
    const { title, startTime } = req.body;
    const startTimeDate = new Date(startTime);
    const auction = await prisma.auction.create({
        data: {
            userSellerId: req.user.id,
            title,
            startTime: startTimeDate,
        },
    });
    //Schedule status change
    const delay = startTimeDate.getTime() - Date.now();
    await auctinonQueue.add(auction.id, { status: 'STARTED' }, { delay });
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