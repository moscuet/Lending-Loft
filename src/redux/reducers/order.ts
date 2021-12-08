import {
  OrderState,
  ProductActions,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from '../../types'

export default function order(
  state: OrderState = {
    inCart: [],
  },
  action: ProductActions
): OrderState {
  switch (action.type) {
  case ADD_PRODUCT: {
    const { product } = action.payload
    if (state.inCart.find((p) => p._id === product._id)) {
      return state
    }
    // Always return new state (e.g, new object) if changed
    const updatedCart = [...state.inCart,product]
    localStorage.setItem('inCart', JSON.stringify(updatedCart));

    return { ...state, inCart: updatedCart }
  }

  case REMOVE_PRODUCT: {
    const { product } = action.payload
    const index = state.inCart.findIndex((p) => p._id === product._id)
    if (index >= 0) {
      state.inCart.splice(index, 1)
      localStorage.setItem('inCart', JSON.stringify([...state.inCart]));
      return { ...state, inCart: [...state.inCart] }
    }
    return state
  }

  default:
    return state
  }
}
