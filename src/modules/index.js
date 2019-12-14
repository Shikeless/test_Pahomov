import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSagas } from "./Auth";
import app from "./App";
import products, { sagas as productsSagas } from "./Products";

export default combineReducers({ auth, app, products });

export function* rootSaga() {
  yield fork(authSagas);
  yield fork(productsSagas);
}
