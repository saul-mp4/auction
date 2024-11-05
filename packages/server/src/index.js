import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import passport from './passport.js';
import {
    authRouter,
    userRouter,
    itemRouter,
    auctionRouter,
} from './routes/index.js';

const app = express();

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

app.listen(3000, () => {
    console.log('Server started');
});
