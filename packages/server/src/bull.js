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
        await prisma.auction.update({
            where: { id: name },
            data: {
                status: 'FINISHED',
            },
        });
        const room = `room:${name}`;
        const io = getIO();
        io.of('/').in(room).emit('message', 'Auction finished');
        io.of('/').in(room).emit('auction-status-change', 'FINISHED');
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
