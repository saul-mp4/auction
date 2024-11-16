import { useQuery } from '@tanstack/react-query';
import { itemsRequests } from '../axios';

export function Items() {
    const query = useQuery({
        queryKey: ['items'],
        queryFn: itemsRequests.getAll,
    });

    return (
        <>
            <h1>Your items</h1>

            <table className="text-xl table-auto border-collapse">
                <thead>
                    <tr className="border-solid border-y-2 border-x-0 border-slate-500 *:p-2">
                        <th>Item Title</th>
                        <th>Item&apos;s Author</th>
                        <th>Collection</th>
                    </tr>
                </thead>
                <tbody>
                    {query.data?.data.map(
                        ({ id, title, author, collection }) => {
                            return (
                                <tr
                                    className="odd:bg-white even:bg-slate-200 *:p-2"
                                    key={id}
                                >
                                    <td>{title}</td>
                                    <td>{author}</td>
                                    <td>{collection}</td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </>
    );
}
