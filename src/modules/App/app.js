import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { setIsLoadingTrue, setIsLoadingFalse } from "./actions";

const isLoading = handleActions(
  {
    [setIsLoadingTrue]: () => true,
    [setIsLoadingFalse]: () => false
  },
  false
);

export default combineReducers({ isLoading });

export const getIsLoading = state => state.app.isLoading;
