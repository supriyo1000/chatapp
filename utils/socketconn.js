// utils/socket.js
import { io } from 'socket.io-client';
import ipAddress from '../app/ipconfig';

// Ensure we are not creating a new connection on every render
let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(`http://${ipAddress}:3001`); // Adjust your IP address as needed
    }
    return socket;
};
