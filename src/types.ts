// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

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
