import { redirect } from 'react-router-dom';

export function authorize() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        return redirect('/login');
    }
    return null;
}
