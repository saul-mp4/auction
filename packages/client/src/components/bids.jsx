import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { format } from 'date-fns';

export function Bids({ status, loadedBids, auctionId, itemId }) {
    const [bidInput, setBidInput] = useState('');
    const [bids, setBids] = useState(loadedBids);

    const handleBidInputChange = (event) => {
        const value = event.target.value;
        if (Number(value) || value === '') {
            setBidInput(value);
        }
    };

    const handlePlaceBid = () => {
        socket.emit('place-bid', {
            price: Number(bidInput),
            timeStamp: new Date().toISOString(),
            auctionId,
            itemId,
        });
        setBidInput('');
    };

    useEffect(() => {
        socket.on('update-bids', (event) => setBids([...bids, event]));
        return () => {
            socket.off('update-bids');
        };
    }, [bids]);

    return (
        <div className="flex gap-8">
            <div>
                <table className="text-xl table-auto border-collapse">
                    <thead>
                        <tr className="border-solid border-2 border-slate-500 *:p-2">
                            <th>Full name</th>
                            <th>Price</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid) => {
                            return (
                                <tr
                                    className="odd:bg-white even:bg-slate-200 *:p-2"
                                    key={bid.id}
                                >
                                    <td>{bid.user.fullName}</td>
                                    <td>{bid.price}</td>
                                    <td>
                                        {format(
                                            new Date(bid.timeStamp),
                                            'dd LLL yyyy HH:mm:ss'
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <input
                    type="text"
                    value={bidInput}
                    name="bid"
                    className="text-xl p-1"
                    onChange={handleBidInputChange}
                    disabled={status !== 'STARTED'}
                />
                <button
                    className="text-xl p-1"
                    onClick={handlePlaceBid}
                    disabled={status !== 'STARTED'}
                >
                    Place a bid
                </button>
            </div>
        </div>
    );
}
