import { takeLatest, put, call, fork } from "redux-saga/effects";
import { save } from "../../localStorage";
import { authRequest, authSuccess, verRequest } from "./actions";
import { fetchAuth, fetchVer } from "./api.js";

function* fetchAuthWatcher(action) {
  yield takeLatest(authRequest, authRequestFlow);
  yield takeLatest(verRequest, verRequestFlow);
}

function* authRequestFlow(action) {
  //Имитируем запрос к Апи
  const token = yield call(fetchAuth, action.payload);
  yield call(save, "jwt", token.jwt);
  yield put(authSuccess());
}

function* verRequestFlow(action) {
  //Имитируем запрос к Апи
  const result = yield call(fetchVer);
  if (result === "success") {
    yield put(authSuccess());
  }
}

export default function* root() {
  yield fork(fetchAuthWatcher);
}
