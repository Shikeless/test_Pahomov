import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { authSuccess, logout } from "./actions";

const isAuthorized = handleActions(
  {
    [authSuccess]: state => true,
    [logout]: state => false
  },
  false
);

export default combineReducers({ isAuthorized });

export const getIsAuthorized = state => state.auth.isAuthorized;
