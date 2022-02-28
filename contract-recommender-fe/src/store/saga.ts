import { all } from "redux-saga/effects";
import processSaga from "./process/saga";

export default function* RootSaga() {
  yield all([processSaga()]);
}
