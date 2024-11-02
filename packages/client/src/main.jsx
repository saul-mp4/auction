import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from 'react-router-dom';
import { App, Auctions, Items, Login, Register, CreateAuctions } from './pages';
import { Container, Protected } from './layouts';
import { authorize } from './loaders';
import { login } from './axios';
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
                action: async ({ request }) => {
                    const formData = await request.formData();
                    const response = await login(
                        formData.get('email'),
                        formData.get('password')
                    );

                    if (response.status === 200) return redirect('/');
                    return null;
                },
            },
            {
                element: <Protected />,
                loader: authorize,
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
