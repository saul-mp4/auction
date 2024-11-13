import { prisma } from '../prisma/client.js';

export async function socketHandlers(socket) {
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
            // Send a confirmation message to the sender
            socket.emit('joined', `You joined room ${auction.title}`);
            // Notify others in the room about the new participant
            socket.to(room).emit('joined', `${user.fullName} joined the room!`);
        }
    });
}
