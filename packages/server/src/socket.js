import { prisma } from '../prisma/client.js';
import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        const user = socket.request.user;
        console.log('connected: ' + user.fullName);
        let room;

        socket.on('auctionId', async (event) => {
            const auction = await prisma.auction.findUnique({
                where: {
                    id: event,
                },
            });

            if (auction?.id) {
                room = `room:${auction.id}`;
                socket.join(room);
                socket.nsp
                    .to(room)
                    .emit('message', `${user.fullName} joined the room!`);
            }
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
};
