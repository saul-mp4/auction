import { Queue, Worker } from 'bullmq';
import { prisma } from '../prisma/client.js';

const connection = {
    host: '127.0.0.1',
    port: 6379,
};

export const auctinonQueue = new Queue('auctions', { connection });

export const auctionWorker = new Worker(
    'auctions',
    async ({ name }) => {
        await prisma.auction.update({
            where: { id: name },
            data: {
                status: 'STARTED',
            },
        });
    },
    { connection }
);

auctionWorker.on('completed', (job) => console.log(`${job.id} completed`));
