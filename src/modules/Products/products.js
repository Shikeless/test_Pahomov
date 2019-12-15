import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { productsSuccess } from "./actions";

const products = handleActions(
  {
    [productsSuccess]: (_state, action) => {
      return [..._state, ...action.payload];
    }
  },
  []
);

export default combineReducers({ products });

export const getProducts = state => state.products.products;
