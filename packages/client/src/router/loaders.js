import { redirect } from 'react-router-dom';
import { auctionRequests } from '../axios';

export function authorizeLoader() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        return redirect('/login');
    }
    return null;
}

export async function auctionRoomLoader({ params }) {
    return (await auctionRequests.getOne(params.auctionId)).data;
}
