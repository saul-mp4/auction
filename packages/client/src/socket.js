import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SERVER_URL, {
    extraHeaders: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
});
socket.emit('hello', { message: 'brother' });
