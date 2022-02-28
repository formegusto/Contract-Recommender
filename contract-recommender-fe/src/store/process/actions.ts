import { createAction } from "redux-actions";
import {
  GET_PROCESS,
  GET_PROCESS_LIST,
  INIT_PROCESS,
  REGIST,
  Regist,
} from "./types";

export const regist = createAction<Regist>(REGIST);
export const getProcessList = createAction(GET_PROCESS_LIST);
export const getProcess = createAction<string>(GET_PROCESS);
export const initProcess = createAction(INIT_PROCESS);
