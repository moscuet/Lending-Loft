import { SET_MESSAGE, CLEAR_MESSAGE, MESSAGE } from "../../types";

export const setMessage = (message:string):MESSAGE => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = (): MESSAGE => ({
  type: CLEAR_MESSAGE,
});