import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import passport from './passport.js';
import {
    authRouter,
    userRouter,
    itemRouter,
    auctionRouter,
} from './routes/index.js';
import { socketHandlers } from './socket.js';

//init
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: 'http://localhost:5173',
});

//express http
app.get('/', (_, res) => res.send('Hello, this is server!'));

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use('/', authRouter);

app.use(passport.authenticate('jwt', { session: false }));

app.use('/user', userRouter);
app.use('/items', itemRouter);
app.use('/auctions', auctionRouter);

// socket
io.engine.use((req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
        passport.authenticate('jwt', { session: false })(req, res, next);
    } else {
        next();
    }
});
io.on('connection', async (socket) => socketHandlers(socket));

//server
server.listen(3000, () => {
    console.log('Server started');
});
