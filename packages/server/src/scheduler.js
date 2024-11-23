import { scheduleJob } from 'node-schedule';
import { socketManager } from './socket.js';
import { prisma } from '../prisma/client.js';

export const scheduleManager = {
    setAuctionStart(auctionId, date) {
        scheduleJob(date, async () => {
            await prisma.auction.update({
                where: { id: auctionId },
                data: {
                    status: 'STARTED',
                },
            });
            socketManager.auctionStarted();
        });
    },
    setAuctionEnd(auctionId, date) {
        scheduleJob(date, async () => {
            const auction = await prisma.auction.update({
                where: { id: auctionId },
                data: {
                    status: 'FINISHED',
                },
                include: {
                    items: true,
                    userSeller: true,
                    bids: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    fullName: true,
                                },
                            },
                        },
                    },
                },
            });

            const highestBid = auction.bids.reduce((prevBid, currBid) =>
                prevBid && prevBid.price > currBid.price ? prevBid : currBid
            );

            await prisma.item.update({
                where: {
                    id: auction.items[0].id,
                },
                data: {
                    userId: highestBid.user.id,
                },
            });

            socketManager.auctionFinished(highestBid.user.fullName);
        });
    },
};
