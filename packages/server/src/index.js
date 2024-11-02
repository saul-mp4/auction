import 'dotenv/config';
import express from 'express';
import passport from './passport.js';
import cors from 'cors';

//Routes
import userRouter from './user.js';
import itemsRouter from './items.js';
import authRouter from './auth.js';
import auctionRouter from './auction.js';

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
app.use('/items', itemsRouter);
app.use('/auctions', auctionRouter);

app.listen(3000, () => {
    console.log('Server started');
});
