import { combineReducers } from 'redux'

import product from './product'

const createRootReducer = () =>
  combineReducers({
    product,
  })

export default createRootReducer
