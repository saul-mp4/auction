import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { socket } from '../socket';
import { EventChat } from '../components';

export function AuctionRoom() {
    const auction = useLoaderData();
    useAuctionSocket(auction);
    return (
        <div>
            <h1 className="text-center mb-8">
                {auction.title}, {auction.status}
            </h1>
            <div className="flex justify-between">
                <h2>{auction.status}</h2>
                <EventChat />
            </div>
        </div>
    );
}

function useAuctionSocket(auction) {
    useEffect(() => {
        socket.emit('auctionId', auction.id);
    }, [auction]);
}
