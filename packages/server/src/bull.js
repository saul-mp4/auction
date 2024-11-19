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
        await prisma.auction.update({
            where: { id: name },
            data: {
                status: 'STARTED',
            },
        });
        endAuctionQueue.add(name, {}, { delay: 60000 });
        const room = `room:${name}`;
        const io = getIO();
        io.of('/').in(room).emit('message', 'Auction started');
        // socket send updated auction data
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
        // socket send updated auction data
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
