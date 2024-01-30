import React from 'react'

import { useSelector } from 'react-redux'
import { AppState } from '../types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeProduct } from '../redux/actions'

import './cart.css'
function Cart() {
  const cartItems = useSelector((state: AppState) => state.order.inCart)
  const dispatch = useDispatch()
  console.log('cartItems', cartItems)
  return (
    <div className="cart">
      <h2 className="cart_title"> Cart </h2>
      {cartItems.length <= 0 && <div>No products in cart</div>}
      {cartItems.length > 0 && <ul>
        {cartItems.map((p) => (
          <li key={p._id}>
            <div>
              <Link to={`/books/${p._id}`}>{`${p.title}`}</Link>
            </div>
            <div>
              <Link to={`/books/${p._id}`}>
                {' '}
                <img src={`${p.img}`} alt="product img" />
              </Link>
            </div>
            <div>
              {`by ${p.authors?.[0]?.firstName} ${p.authors[0]?.lastName}, ${p.edition}`}
            </div>
            <div>
            </div>
            <div>
              <button onClick={() => dispatch(removeProduct(p))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>}

      {cartItems.length > 0 && (<button><Link to='/user/checkout'>Checkout</Link></button>)}
    </div>

  )
}

export default Cart
