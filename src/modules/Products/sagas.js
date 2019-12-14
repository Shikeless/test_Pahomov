import { takeLatest, put, call, fork } from "redux-saga/effects";
import { save } from "../../localStorage";
import { fetchProducts } from "./api.js";
import { productsRequest, productsSuccess } from "./actions.js";
import { setIsLoadingTrue, setIsLoadingFalse } from "../App";

function* fetchProductsWatcher(action) {
  yield takeLatest(productsRequest, productsRequestFlow);
}

function* productsRequestFlow(action) {
  //Имитируем запрос к Апи
  yield put(setIsLoadingTrue());
  const products = yield call(fetchProducts);
  console.log(products);
  yield put(productsSuccess(products));
  yield put(setIsLoadingFalse());
}

export default function* root() {
  yield fork(fetchProductsWatcher);
}
