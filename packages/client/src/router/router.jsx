import { createBrowserRouter } from 'react-router-dom';
import {
    App,
    Auctions,
    Items,
    Login,
    Register,
    AuctionsCreate,
    AuctionRoom,
} from '../pages';
import { Container, Protected } from '../layouts';
import { auctionRoomLoader, authorizeLoader } from './loaders';
import { createAuctionAction, loginAction } from './actions';

export const router = createBrowserRouter([
    {
        element: <Container />,
        children: [
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
                action: loginAction,
            },
            {
                element: <Protected />,
                loader: authorizeLoader,
                children: [
                    {
                        path: '/',
                        element: <App />,
                    },
                    {
                        path: 'auctions',
                        children: [
                            {
                                index: true,
                                element: <Auctions />,
                            },
                            {
                                path: 'create',
                                element: <AuctionsCreate />,
                                action: createAuctionAction,
                            },
                            {
                                path: 'room/:auctionId',
                                element: <AuctionRoom />,
                                loader: auctionRoomLoader,
                            },
                        ],
                    },
                    {
                        path: 'items',
                        element: <Items />,
                    },
                ],
            },
        ],
    },
    {
        path: '/ping',
        element: <h1>Pong</h1>,
    },
]);
