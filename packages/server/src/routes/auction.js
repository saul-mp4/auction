import express from 'express';

import { prisma } from '../../prisma/client.js';
import { startAuctionQueue } from '../bull.js';

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
            include: {
                items: {
                    select: {
                        title: true,
                    },
                },
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
                items: {
                    select: {
                        title: true,
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
            include: {
                items: true,
                userSeller: true,
                bids: {
                    include: {
                        user: {
                            select: {
                                fullName: true,
                            },
                        },
                    },
                },
            },
        })
    );
});

auctionRouter.post('/', async (req, res) => {
    const { title, startTime, itemId } = req.body;
    const startTimeDate = new Date(startTime);
    const endTime = new Date(startTimeDate.getTime() + 1 * 60 * 1000);
    const auction = await prisma.auction.create({
        data: {
            userSellerId: req.user.id,
            title,
            startTime: startTimeDate,
            endTime,
        },
    });
    //Schedule status change
    const delay = startTimeDate.getTime() - Date.now();
    await startAuctionQueue.add(auction.id, { status: 'STARTED' }, { delay });
    //Add item to auction
    await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            auctionId: auction.id,
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
