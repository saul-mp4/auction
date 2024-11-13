import { Outlet } from 'react-router-dom';

export function Container() {
    return (
        <main className="m-12">
            <Outlet />
        </main>
    );
}
