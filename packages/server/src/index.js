import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';

import passport from './passport.js';
import {
    authRouter,
    userRouter,
    itemRouter,
    auctionRouter,
    bidsRouter,
} from './routes/index.js';
import { initSocket } from './socket.js';

//init
const app = express();
const server = createServer(app);
const io = initSocket(server);

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
app.use('/bids', bidsRouter);

// socket
io.engine.use((req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
        passport.authenticate('jwt', { session: false })(req, res, next);
    } else {
        next();
    }
});

//server
server.listen(3000, () => {
    console.log('Server started');
});
