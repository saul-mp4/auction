import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App, Auctions, Items, Login, Register, CreateAuctions } from './pages';
import { Container, Protected } from './layouts';
import './index.css';

const router = createBrowserRouter([
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
            },
            {
                element: <Protected />,
                children: [
                    {
                        path: '/',
                        element: <App />,
                    },
                    {
                        path: 'auctions',
                        element: <Auctions />,
                    },
                    {
                        path: 'auctions/create',
                        element: <CreateAuctions />,
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

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
