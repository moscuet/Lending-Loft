
// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const payload = 'payload'
// A product


export type TCustomer = {
  id: string
  firstName: string
  lastName: string
  useremail: string
  phoneNumber: number
  address: string
  password: string
  rolse: string[]
}

export type TUserState = {
     useremail: string,
    password: string,
    loading: boolean,
}


// author Type

export type Author ={
  firstName: string
  lastName: string
  biography: string,
  _id: string
}
// product type

export type Product = {
  _id:string
  title: string
  ISBN: string
  publisherName: string
  authors: Author[]
  publishedYear: number
  genres: string[]
  description: string
  edition: string
  pageCount: number,
  img:string
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


export type OrderState = {
  inCart: Product[]
}

//message type

// authentication types

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";



// message type 

export type SetMessage = {
  type: typeof SET_MESSAGE
  payload: string
}
export type ClearMessage = {
  type: typeof CLEAR_MESSAGE
}


export type MesssageActions = SetMessage | ClearMessage

export type MessageState = string


// auth type
export type LOGIN_DATA ={
  useremail:string
  passpword: string
}

export type USER_DATA =  {
  id?: any | null,
  firstName?: string | null,
  lastName?: string | null,
  useremail?: string,
  address?: string
  password?: string,
  roles?:string
}



export type  AUTH_ACTION = {
  type: typeof REGISTER_SUCCESS | typeof REGISTER_FAIL | typeof LOGIN_SUCCESS | typeof LOGIN_FAIL | typeof LOGOUT  ,
  payload: LOGIN_DATA |  USER_DATA
}

export type AuthState = {
  isLoggedIn: boolean,
  user: USER_DATA
}




export type AppState = {
  auth: AuthState
  message: MessageState
  order: OrderState
}