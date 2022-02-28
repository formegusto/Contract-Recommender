import API from "../../api";
import createRequestSaga from "../../utils/createRequestSaga";
import { GET_PROCESS, GET_PROCESS_LIST, REGIST } from "./types";
import { takeLatest } from "redux-saga/effects";

const registSaga = createRequestSaga(REGIST, API.process.regist);
const getProcessListSaga = createRequestSaga(
  GET_PROCESS_LIST,
  API.process.getProcessList
);
const getProcessSaga = createRequestSaga(GET_PROCESS, API.process.getProcess);

export default function* processSaga() {
  yield takeLatest(REGIST, registSaga);
  yield takeLatest(GET_PROCESS_LIST, getProcessListSaga);
  yield takeLatest(GET_PROCESS, getProcessSaga);
}
