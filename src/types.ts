
// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const payload = 'payload'
// A product
export type Product = {
  id:string
  title: string
  // ISBN: string
  // publisherName: string
  // authors: string[]
  // publishedYear: number
  // genres: string[]
  // description: string
  // edition: string
  // pageCount: number
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
  inCart: Product[]
}

export type AppState = {
  product: ProductState
}


// authentication types

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export type LOGIN_DATA ={
  username:string
  passpword: string
}

export type USER_DATA =  {
  id?: any | null,
  username?: string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}


export type Message = {
  type: typeof SET_MESSAGE
  payload: string
}
export type SetMessage = {
  type: typeof CLEAR_MESSAGE
}


export type MESSAGE = Message | SetMessage

export type  AUTH_ACTION = {
  type: typeof REGISTER_SUCCESS | typeof REGISTER_FAIL | typeof LOGIN_SUCCESS | typeof LOGIN_FAIL | typeof LOGOUT  ,
  payload: LOGIN_DATA |  USER_DATA
}

