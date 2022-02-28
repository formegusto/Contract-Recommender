import { Socket } from "socket.io-client";
import { createAction } from "redux-actions";
import { CONNECT_SOCKET, DISCONNECT_SOCKET } from "./types";

export const connectSocket = createAction<Socket>(CONNECT_SOCKET);
export const disconnectSocket = createAction(DISCONNECT_SOCKET);
