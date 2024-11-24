import { format } from 'date-fns';

const statusColors = {
    CREATED: 'bg-neutral-200',
    STARTED: 'bg-green-200',
    FINISHED: 'bg-red-200',
};

export function RoomInfo({ fullName, status, startTime, endTime }) {
    return (
        <div className="rounded-sm border border-solid border-black">
            <h2 className="p-2">Room Info</h2>
            <ul className="list-none">
                <li className="p-2 bg-neutral-200 rounded-sm  ">
                    <span className="font-bold">Host - </span>
                    <span>{fullName}</span>
                </li>
                <li className={`p-2 ${statusColors[status]} rounded-sm`}>
                    <span className="font-bold">Status - </span>
                    <span>{status.toLowerCase()}</span>
                </li>
                <li className="p-2 bg-neutral-200 rounded-sm  ">
                    <span className="font-bold">Start time - </span>
                    <span>
                        {format(new Date(startTime), 'dd LLL yyyy HH:mm')}
                    </span>
                </li>
                <li className="p-2 bg-neutral-200 rounded-sm  ">
                    <span className="font-bold">End time - </span>
                    <span>
                        {format(new Date(endTime), 'dd LLL yyyy HH:mm')}
                    </span>
                </li>
            </ul>
        </div>
    );
}
