import { redirect } from 'react-router-dom';

export function authorizeLoader() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        return redirect('/login');
    }
    return null;
}
