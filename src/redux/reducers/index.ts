import { combineReducers } from 'redux'

import product from './product'
import auth from "./auth";
import message from "./message";

const createRootReducer = () =>
  combineReducers({
    auth,
    message,
    product,
  })

export default createRootReducer
