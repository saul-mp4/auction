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
            // socket.emit('message', `You joined room ${auction.title}`);
            socket.nsp
                .to(room)
                .emit('message', `${user.fullName} joined the room!`);
        }
    });
}
