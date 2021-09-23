import { all } from "@redux-saga/core/effects";
import launchesSaga from "./saga/launchesSaga";

export default function* rootSaga() {
  yield all([launchesSaga()]);
}
