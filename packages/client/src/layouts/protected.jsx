import { Outlet } from 'react-router-dom';

export function Protected() {
    return (
        <>
            <h1>Protected</h1>
            <Outlet />
        </>
    );
}
