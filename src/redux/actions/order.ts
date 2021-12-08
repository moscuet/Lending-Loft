import { Dispatch } from 'redux'

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ProductActions,
  Product,
} from '../../types'
// localStorage.setItem('testObject', JSON.stringify(testObject));
//var retrievedObject = localStorage.getItem('testObject');

export function addProduct(product: Product): ProductActions {
  return {
    type: ADD_PRODUCT,
    payload: {
      product,
    },
  }
}

export function removeProduct(product: Product): ProductActions {
  return {
    type: REMOVE_PRODUCT,
    payload: {
      product,
    },
  }
}

/*
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
  
*/



// Async action processed by redux-thunk middleware
export function fetchProduct(productId: string) {
  return (dispatch: Dispatch) => {
    return fetch(`products/${productId}`)
      .then((resp) => resp.json())
      .then((product) => {
        dispatch(addProduct(product))
      })
  }
}
