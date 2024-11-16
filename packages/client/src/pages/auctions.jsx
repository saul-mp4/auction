import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { auctionRequests } from '../axios';
import { Link } from 'react-router-dom';

export function Auctions() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['auctions'],
        queryFn: auctionRequests.getAll,
    });

    const mutation = useMutation({
        mutationFn: auctionRequests.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auctions'] });
        },
    });

    return (
        <div>
            <h1>Your active auctions</h1>

            <table className="text-xl table-auto border-collapse">
                <thead>
                    <tr className="border-solid border-y-2 border-x-0 border-slate-500 *:p-2">
                        <th>Auction title</th>
                        <th>Start time</th>
                        <th>Item</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {query.data?.data.map(
                        ({ id, title, startTime, status, items }) => {
                            return (
                                <tr
                                    className="odd:bg-white even:bg-slate-200 *:p-2"
                                    key={id}
                                >
                                    <td>{title}</td>
                                    <td>
                                        {format(
                                            new Date(startTime),
                                            'dd LLL yyyy HH:mm'
                                        )}
                                    </td>
                                    <td>{items[0].title}</td>
                                    <td>{status.toLowerCase()}</td>
                                    <td>
                                        <button
                                            className="py-1 px-2 text-lg"
                                            onClick={() => mutation.mutate(id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`room/${id}`}>
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
