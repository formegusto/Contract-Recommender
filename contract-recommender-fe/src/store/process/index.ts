import { handleActions } from "redux-actions";
import { ResponseType } from "../types";
import {
  GET_PROCESS_LIST_SUCCESS,
  GET_PROCESS_SUCCESS,
  INIT_PROCESS,
  REGIST_SUCCESS,
  ReportBase,
} from "./types";

type ProcessStore = {
  reports: ReportBase[] | null;
  report: ReportBase | null;
};
type Payload = ResponseType;

const processStore: ProcessStore = {
  reports: null,
  report: null,
};
const ProcessReducer = handleActions<ProcessStore, Payload>(
  {
    [REGIST_SUCCESS]: (state, action) => ({
      ...state,
      reports: state.reports
        ? [action.payload.data].concat(state.reports)
        : state.reports,
    }),
    [GET_PROCESS_LIST_SUCCESS]: (state, action) => ({
      ...state,
      reports: action.payload.data,
    }),
    [GET_PROCESS_SUCCESS]: (state, action) => ({
      ...state,
      report: action.payload.data,
    }),
    [INIT_PROCESS]: (state) => ({
      ...state,
      report: null,
    }),
  },
  processStore
);

export default ProcessReducer;
