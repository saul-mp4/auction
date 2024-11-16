import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { socket } from '../socket';
import { EventChat } from '../components';
import { format } from 'date-fns';

export function AuctionRoom() {
    const auction = useLoaderData();
    console.log(auction);
    useAuctionSocket(auction);
    return (
        <div>
            <h1 className="text-center mb-8">{auction.title}</h1>
            <div className="flex gap-16">
                <div className="rounded-sm border border-solid border-black">
                    <h2 className="p-2">Room Info</h2>
                    <ul className="list-none">
                        <li className="p-2 bg-neutral-200 rounded-sm  ">
                            <span className="font-bold">Status - </span>
                            <span>{auction.status.toLowerCase()}</span>
                        </li>
                        <li className="p-2 bg-neutral-200 rounded-sm  ">
                            <span className="font-bold">Start time - </span>
                            <span>
                                {format(
                                    new Date(auction.startTime),
                                    'dd LLL yyyy HH:mm'
                                )}
                            </span>
                        </li>
                    </ul>
                </div>
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
