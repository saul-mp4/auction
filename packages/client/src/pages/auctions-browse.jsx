import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { auctionRequests } from '../axios';
import { Link } from 'react-router-dom';

export function AuctionsBrowse() {
    const query = useQuery({
        queryKey: ['auctions'],
        queryFn: auctionRequests.getAllOther,
    });

    return (
        <div>
            <h1>Browse and participate in others auctions</h1>

            <table className="text-xl table-auto border-collapse">
                <thead>
                    <tr className="border-solid border-y-2 border-x-0 border-slate-500 *:p-2">
                        <th>Auction host</th>
                        <th>Auction title</th>
                        <th>Start time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {query.data?.data.map(
                        ({ id, title, startTime, status, userSeller }) => {
                            return (
                                <tr
                                    className="odd:bg-white even:bg-slate-200 *:p-2"
                                    key={id}
                                >
                                    <td>{userSeller.fullName}</td>
                                    <td>{title}</td>
                                    <td>
                                        {format(
                                            new Date(startTime),
                                            'dd LLL yyyy HH:mm'
                                        )}
                                    </td>
                                    <td>{status}</td>
                                    <td>
                                        <Link to={`/auctions/room/${id}`}>
                                            Go to room
                                        </Link>
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}
