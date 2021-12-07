import { combineReducers } from 'redux'

import order from './order'
import auth from "./auth";
import message from "./message";

const createRootReducer = () =>
  combineReducers({
    auth,
    message,
    order,
  })

export default createRootReducer
