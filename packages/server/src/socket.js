import { prisma } from '../prisma/client.js';
import { Server } from 'socket.io';
import { passport } from './passport.js';

export const socketManager = {
    io: null,
    room: null,

    init(server) {
        this.io = new Server(server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST'],
            },
        });

        this.handleMiddlewares();

        this.io.on('connection', this.handleConnection.bind(this));
        return this.io;
    },

    getIO() {
        if (!this.io) {
            throw new Error('Socket.IO not initialized');
        }
        return this.io;
    },

    handleMiddlewares() {
        this.io.engine.use((req, res, next) => {
            const isHandshake = req._query.sid === undefined;
            if (isHandshake) {
                passport.authenticate('jwt', { session: false })(
                    req,
                    res,
                    next
                );
            } else {
                next();
            }
        });
    },

    async handleConnection(socket) {
        const user = socket.request.user;
        console.log('connected: ' + user.fullName);

        socket.on('auctionId', async (event) => {
            const auction = await prisma.auction.findUnique({
                where: {
                    id: event,
                },
            });

            if (auction?.id) {
                this.room = `room:${auction.id}`;
                socket.join(this.room);
                socket.nsp
                    .to(this.room)
                    .emit('message', `${user.fullName} joined the room!`);
            }
        });

        socket.on(
            'place-bid',
            async ({ price, timeStamp, auctionId, itemId }) => {
                const bid = await prisma.bid.create({
                    data: {
                        userId: user.id,
                        price,
                        timeStamp,
                        auctionId,
                        itemId,
                    },
                    include: {
                        user: {
                            select: {
                                fullName: true,
                            },
                        },
                    },
                });

                socket.nsp.to(this.room).emit('update-bids', bid);
                socket.nsp
                    .to(this.room)
                    .emit(
                        'message',
                        `${user.fullName} placed a bid of ${bid.price}`
                    );
            }
        );
    },
    auctionStarted() {
        this.io.of('/').in(this.room).emit('message', 'Auction started');
        this.io.of('/').in(this.room).emit('auction-status-change', 'STARTED');
    },
    auctionFinished(winnerName) {
        this.io.of('/').in(this.room).emit('message', 'Auction finished');
        this.io
            .of('/')
            .in(this.room)
            .emit('message', `The winner is ${winnerName}`);
        this.io.of('/').in(this.room).emit('auction-status-change', 'FINISHED');
    },
};
