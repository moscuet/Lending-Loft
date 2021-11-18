import { all } from 'redux-saga/effects'

import productSagas from './product'

export default function* rootSaga() {
  yield all([...productSagas])
}
