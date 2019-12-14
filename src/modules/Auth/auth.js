import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { authRequest, authSuccess } from "./actions";

const isAuthorized = handleActions(
  {
    [authSuccess]: state => true
  },
  false
);

// const isLoading = handleActions(
//   {
//     [setIsLoading]: () => true,
//     [removeIsLoading]: () => false
//   },
//   true
// );

export default combineReducers({ isAuthorized });

export const getIsAuthorized = state => state.auth.isAuthorized;
