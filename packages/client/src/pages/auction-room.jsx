import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { socket } from '../socket';
import {
    EventChat,
    CountdownTimer,
    Bids,
    ItemInfo,
    RoomInfo,
} from '../components';

export function AuctionRoom() {
    const auction = useLoaderData();
    const [status, setStatus] = useState(auction.status);
    const item = auction.items[0];

    useEffect(() => {
        socket.emit('auctionId', auction.id);
    }, [auction.id]);

    useEffect(() => {
        socket.on('auction-status-change', (event) => setStatus(event));
        return () => {
            socket.off('auction-status-change');
        };
    }, []);

    return (
        <div>
            <h1 className="text-center mb-8">{auction.title}</h1>
            <div className="flex gap-16 mb-4">
                <RoomInfo
                    fullName={auction.userSeller.fullName}
                    status={status}
                    startTime={auction.startTime}
                    endTime={auction.endTime}
                />
                <ItemInfo
                    title={item.title}
                    author={item.author}
                    collection={item.collection}
                />
                <EventChat />
                <CountdownTimer
                    startTime={new Date(auction.startTime)}
                    endTime={new Date(auction.endTime)}
                    status={status}
                />
            </div>
            <Bids
                status={status}
                loadedBids={auction.bids}
                itemId={auction.items[0].id}
                auctionId={auction.id}
            />
        </div>
    );
}
