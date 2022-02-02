import { Dispatch  } from 'redux'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  USER_DATA,
  USERUPDATE_SUCCESS,
  USERUPDATE_FAIL
  // AUTH_ACTION
} from "../../types";
  
import AuthService from "../../services/authService";
import userService from "../../services/userService";

  
  
export const register = (firstName: string, lastName: string, email: string, password: string ,phoneNumber:string, address: string) => (dispatch:Dispatch) => {
  return AuthService.register(firstName,lastName,email,phoneNumber,address,password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
  
      return Promise.resolve();
    },
    (error) => {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
      dispatch({
        type: REGISTER_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    }
  );
};
  
export const login = (username:string, password:string) => (dispatch:Dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data ,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
      dispatch({
        type: LOGIN_FAIL,
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    }
  );
};
  


export const updateUser = (user:USER_DATA, id:string) => (dispatch:Dispatch) => {
  return userService.updateUser(user, id).then(
    (data) => {
      dispatch({
        type: USERUPDATE_SUCCESS,
        payload:user
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
      dispatch({
        type: USERUPDATE_FAIL,
        payload:user
      });
  
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
  
      return Promise.reject();
    }
  );
};
  




export const logout = () => (dispatch:Dispatch) => {
  AuthService.logout();
  
  dispatch({
    type: LOGOUT,
  });
};



