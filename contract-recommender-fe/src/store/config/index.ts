import { handleActions } from "redux-actions";
import { Socket } from "socket.io-client";
import { CONNECT_SOCKET } from "./types";

type ConfigStore = {
  socket: Socket | null;
};
type Payload = Socket;

const configStore: ConfigStore = {
  socket: null,
};
const ConfigReducer = handleActions<ConfigStore, Payload>(
  {
    [CONNECT_SOCKET]: (state, action) => ({
      ...state,
      socket: action.payload,
    }),
  },
  configStore
);
export default ConfigReducer;
