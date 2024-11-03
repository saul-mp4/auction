import { auctionRequests, login } from '../axios';
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

export async function createAuctionAction({ request }) {
    const formData = await request.formData();
    const response = await auctionRequests.post(
        formData.get('title'),
        formData.get('startTime')
    );

    if (response.status === 200) return redirect('/auctions');
    return null;
}
