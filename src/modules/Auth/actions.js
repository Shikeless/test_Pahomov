import { createAction } from "redux-actions";

export const authRequest = createAction("AUTH/REQUEST");
export const authSuccess = createAction("AUTH/SUCCESS");

export const verRequest = createAction("VER/REQUEST");
