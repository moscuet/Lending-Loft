import { takeLatest } from 'redux-saga/effects'

import { ADD_PRODUCT, AddProductAction } from '../../types'

function* doSomethingWhenAddingProduct(action: AddProductAction) {
  yield console.log(action)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [takeLatest(ADD_PRODUCT, doSomethingWhenAddingProduct)]
