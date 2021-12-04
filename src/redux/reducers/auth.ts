/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ACTION,
  // USER_DATA
} from "../../types";
  
const user = JSON.parse(localStorage.getItem("user") || '{}');
  
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

type stateT = typeof initialState

export default function (state = initialState, action:AUTH_ACTION):stateT  {
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
    return {
      ...state,
      isLoggedIn: true,
      user: payload.username,
    };
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
  default:
    return state;
  }
}