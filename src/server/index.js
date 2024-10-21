import express from 'express';
import passport from './passport.js';
import path from 'path';

//Routes
import userRouter from './user.js';

import itemsRouter from './items.js';
import authRouter from './auth.js';
import auctionRouter from './auction.js';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// app.use("")

app.use('/api', authRouter);

app.use(passport.authenticate('jwt', { session: false }));

app.use('/api/user', userRouter);
app.use('/api/items', itemsRouter);
app.use('/api/auctions', auctionRouter);

app.listen(3000, () => {
    console.log('Server started');
});
