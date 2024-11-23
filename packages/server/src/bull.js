import { Queue, Worker } from 'bullmq';
import { prisma } from '../prisma/client.js';
import { socketManager } from './socket.js';

const connection = {
    host: '127.0.0.1',
    port: 6379,
};

export const startAuctionQueue = new Queue('start-auction', { connection });
export const endAuctionQueue = new Queue('end-auction', { connection });

const startAuctionWorker = new Worker(
    'start-auction',
    async ({ name }) => {
        const auction = await prisma.auction.update({
            where: { id: name },
            data: {
                status: 'STARTED',
            },
        });
        const delay = auction.endTime.getTime() - Date.now();
        endAuctionQueue.add(name, {}, { delay });

        socketManager.auctionStarted();
    },
    { connection }
);
const endAuctionWorker = new Worker(
    'end-auction',
    async ({ name }) => {
        try {
            const auction = await prisma.auction.update({
                where: { id: name },
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
        } catch (e) {
            console.error(e);
        }
    },
    {
        connection,
    }
);

startAuctionWorker.on('completed', (job) =>
    console.log(`auction start job - ${job.id} completed`)
);
endAuctionWorker.on('completed', (job) =>
    console.log(`auction end job - ${job.id} completed`)
);
