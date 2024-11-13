import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { socket } from '../socket';

export function AuctionRoom() {
    const auction = useLoaderData();
    useAuctionSocket(auction);
    return (
        <div>
            <h1>Auction Room - {auction.title}</h1>
            <h2>Status - {auction.status}</h2>
        </div>
    );
}

function useAuctionSocket(auction) {
    useEffect(() => {
        socket.emit('auctionId', auction.id);

        socket.on('joined', (event) => console.log(event));

        return () => {
            socket.off('joined');
        };
    }, [auction]);
}
