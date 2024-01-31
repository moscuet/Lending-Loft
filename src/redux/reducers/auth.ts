/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ACTION,
  USERUPDATE_FAIL,
  USERUPDATE_SUCCESS
} from "../../types";
  
const user = JSON.parse(localStorage.getItem("user") || '{}');
  
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export type UserState = typeof initialState

export default function (state = initialState, action:AUTH_ACTION):any  {
  const { type, payload }= action;
  
  switch (type) {
  case REGISTER_SUCCESS:
    return {
      ...state,
      isLoggedIn: false,
    };
  case REGISTER_FAIL:
    return {
      ...state,
      isLoggedIn: false,
    };
  case LOGIN_SUCCESS:
    state ={
      ...state,
      isLoggedIn: true,
      user: payload,
    };
    return state

  case LOGIN_FAIL:
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    };
  case LOGOUT:
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    };

  case USERUPDATE_SUCCESS:
    return {
      ...state, user:{...user,...payload}
    };

  case USERUPDATE_FAIL:
    return {
      ...state
    };

  default:
    return state;
  }
}