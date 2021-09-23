import { all, put, takeEvery, call } from "redux-saga/effects";
import {
  getLaunchesApi,
  getLaunchesByFilterApi,
} from "../../service/launcheService";
import {
  loadLaunches,
  setLaunches,
  setLaunchesState,
} from "../reducer/launchesReducer";

function* LOAD_LAUNCHES({ payload }) {
  yield put(setLaunchesState({ loading: true }));

  let launches;

  if (payload) {
    launches = yield call(() => getLaunchesByFilterApi(payload));
  } else {
    launches = yield call(() => getLaunchesApi());
  }

  yield put(setLaunches(launches));

  yield put(setLaunchesState({ loading: false }));
}

export default function* rootSaga() {
  yield all([takeEvery(loadLaunches, LOAD_LAUNCHES)]);
}
