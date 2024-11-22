import { Queue, Worker } from 'bullmq';
import { prisma } from '../prisma/client.js';
import { getIO } from './socket.js';

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

        const room = `room:${name}`;
        const io = getIO();
        io.of('/').in(room).emit('message', 'Auction started');
        io.of('/').in(room).emit('auction-status-change', 'STARTED');
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

            const highestBidUser = auction.bids.reduce((prevBid, currBid) =>
                prevBid && prevBid.price > currBid.price ? prevBid : currBid
            );

            await prisma.item.update({
                where: {
                    id: auction.items[0].id,
                },
                data: {
                    userId: highestBidUser.user.id,
                },
            });

            const room = `room:${name}`;
            const io = getIO();
            io.of('/').in(room).emit('message', 'Auction finished');
            io.of('/')
                .in(room)
                .emit(
                    'message',
                    `The winner is ${highestBidUser.user.fullName}`
                );
            io.of('/').in(room).emit('auction-status-change', 'FINISHED');
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
