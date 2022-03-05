import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'



import { AppState, Product, USER_DATA } from '../types'
import createRootReducer from './reducers'
import rootSaga from './sagas'

const initialCart:Product[] = JSON.parse(localStorage.getItem('inCart') || '[]') 
const initialUser:USER_DATA = JSON.parse(localStorage.getItem('user') || '[]') 
console.log('initialUser',initialUser)
export const initState: AppState = {
  auth:{
    isLoggedIn: initialUser? true : false,
    user:initialUser
  },
  message:'',
  order: {
    inCart: initialCart
  },
}


export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  ) 


  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
