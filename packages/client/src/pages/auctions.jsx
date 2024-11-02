import { format } from 'date-fns';

export function Auctions() {
    return (
        <div>
            <h1>Your active auctions</h1>

            <table class="text-xl table-auto border-collapse">
                <thead>
                    <tr class="border-solid border-y-2 border-x-0 border-slate-500 *:p-2">
                        <th>Auction title</th>
                        <th>Start time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-white even:bg-slate-200 *:p-2">
                        <td>Title</td>
                        <td>{format(new Date(), 'dd LLL yyyy HH:mm')}</td>
                        <td>Status</td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
