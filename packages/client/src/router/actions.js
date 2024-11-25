import { auctionRequests, login, register } from '../axios';
import { redirect } from 'react-router-dom';

export async function loginAction({ request }) {
    const formData = await request.formData();
    const response = await login(
        formData.get('email'),
        formData.get('password')
    );

    if (response.status === 200) return redirect('/');
    return null;
}

export async function registerAction({ request }) {
    const formData = await request.formData();
    const response = await register(
        formData.get('fullName'),
        formData.get('email'),
        formData.get('password')
    );

    if (response.status === 200) return redirect('/login');
    return null;
}

export async function createAuctionAction({ request }) {
    const formData = await request.formData();
    const startTime = new Date(Date.now() + 2 * 60 * 1000).toISOString();
    const response = await auctionRequests.post(
        formData.get('title'),
        startTime,
        formData.get('items')
    );

    if (response.status === 200) return redirect('/auctions');
    return null;
}
