import { useEffect, useState } from 'react';
import { socket } from '../socket';

export function EventChat() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        socket.on('message', (event) =>
            setMessages([event, ...messages].slice(0, 10))
        );
        return () => {
            socket.off('message');
        };
    }, [messages]);

    return (
        <div className="rounded-sm border border-solid border-black">
            <h2 className="p-2">Events</h2>
            <ul className="list-none">
                {messages.map((message, i) => {
                    return (
                        <li
                            key={message + i}
                            className="p-2 bg-slate-200 rounded-sm  "
                        >
                            {message}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
