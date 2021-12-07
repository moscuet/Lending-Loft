import { SET_MESSAGE, CLEAR_MESSAGE, SetMessage, ClearMessage } from "../../types";

export const setMessage = (message:string):SetMessage => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = (): ClearMessage => ({
  type: CLEAR_MESSAGE,
});