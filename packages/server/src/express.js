import express from 'express';
import cors from 'cors';

import { passport } from './passport.js';
import {
    authRouter,
    userRouter,
    itemRouter,
    auctionRouter,
    bidsRouter,
} from './routes/index.js';

export const expressManager = {
    app: null,
    init() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(
            cors({
                origin: 'http://localhost:5173',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                allowedHeaders: ['Content-Type', 'Authorization'],
            })
        );

        this.app.get('/', (_, res) => res.send('Hello, this is server!'));
        this.app.use('/', authRouter);

        this.app.use(passport.authenticate('jwt', { session: false }));

        this.initProtectedRoutes();

        return this.app;
    },
    initProtectedRoutes() {
        this.app.use('/user', userRouter);
        this.app.use('/items', itemRouter);
        this.app.use('/auctions', auctionRouter);
        this.app.use('/bids', bidsRouter);
    },
};
