import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { socket } from '../socket';
import { EventChat, CountdownTimer, Bids } from '../components';
import { format } from 'date-fns';

const statusColors = {
    CREATED: 'bg-neutral-200',
    STARTED: 'bg-green-200',
    FINISHED: 'bg-red-200',
};

export function AuctionRoom() {
    const auction = useLoaderData();
    const { status } = useAuctionSocket(auction);

    return (
        <div>
            <h1 className="text-center mb-8">{auction.title}</h1>
            <div className="flex gap-16 mb-4">
                <div className="rounded-sm border border-solid border-black">
                    <h2 className="p-2">Room Info</h2>
                    <ul className="list-none">
                        <li className="p-2 bg-neutral-200 rounded-sm  ">
                            <span className="font-bold">Host - </span>
                            <span>{auction.userSeller.fullName}</span>
                        </li>
                        <li
                            className={`p-2 ${statusColors[status]} rounded-sm`}
                        >
                            <span className="font-bold">Status - </span>
                            <span>{status.toLowerCase()}</span>
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
                        <li className="p-2 bg-neutral-200 rounded-sm  ">
                            <span className="font-bold">End time - </span>
                            <span>
                                {format(
                                    new Date(auction.endTime),
                                    'dd LLL yyyy HH:mm'
                                )}
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="rounded-sm border border-solid border-black">
                    <h2 className="p-2">Item Info</h2>
                    <ul className="list-none">
                        <li className="p-2 bg-stone-200 rounded-sm  ">
                            <span className="font-bold">Title - </span>
                            <span>{auction.items[0].title}</span>
                        </li>
                        <li className="p-2 bg-stone-200 rounded-sm  ">
                            <span className="font-bold">Author - </span>
                            <span>{auction.items[0].author}</span>
                        </li>
                        <li className="p-2 bg-stone-200 rounded-sm  ">
                            <span className="font-bold">Collection - </span>
                            <span>{auction.items[0].collection}</span>
                        </li>
                    </ul>
                </div>
                <EventChat />
                <CountdownTimer
                    startTime={new Date(auction.startTime)}
                    endTime={new Date(auction.endTime)}
                    status={status}
                />
            </div>
            <div className="flex gap-16">
                <Bids
                    status={status}
                    loadedBids={auction.bids}
                    itemId={auction.items[0].id}
                    auctionId={auction.id}
                />
            </div>
        </div>
    );
}

function useAuctionSocket(auction) {
    const [status, setStatus] = useState(auction.status);
    useEffect(() => {
        socket.emit('auctionId', auction.id);
        socket.on('auction-status-change', (event) => setStatus(event));
        return () => {
            socket.off('auction-status-change');
        };
    }, [auction]);

    return { status };
}
