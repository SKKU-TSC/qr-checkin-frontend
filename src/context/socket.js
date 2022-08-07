// Dedicated socket file for socket connection
// This is to prevent multiple socket connection
// Using react context to share socket connection
import React from "react";
import io from "socket.io-client";

export const socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
    withCredentials: true,
});
export const SocketContext = React.createContext(socket);
