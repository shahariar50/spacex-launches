import { all, put, takeEvery, call } from "redux-saga/effects";
import { getLaunchesApi } from "../../service/launcheService";
import {
  loadLaunches,
  setLaunches,
  setLaunchesState,
} from "../reducer/launchesReducer";

function* LOAD_LAUNCHES() {
  yield put(setLaunchesState({ loading: true }));

  let launches = yield call(() => getLaunchesApi());

  if (launches) {
    yield put(setLaunches(launches));
  }

  yield put(setLaunchesState({ loading: false }));
}

export default function* rootSaga() {
  yield all([takeEvery(loadLaunches, LOAD_LAUNCHES)]);
}
