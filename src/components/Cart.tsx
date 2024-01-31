
import { useSelector } from 'react-redux'
import { AppState } from '../types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../redux/actions'
import { BUTTON } from './ui/StyledComponenet'

import './cart.css'

function Cart() {
  const cartItems = useSelector((state: AppState) => state.order.inCart)
  const dispatch = useDispatch()
  return (

    <div className="cart" >
      <div>
        <h5 className="cart_title"> Your Borrowing basket </h5>
        {cartItems.length <= 0 && <div>No products in the cart</div>}
        {cartItems.length > 0 && <ul style={{ marginBottom: '40px' }}>
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
                <BUTTON style={{ background: 'var(--button-danger-bg-color)' }} onClick={() => dispatch(removeProduct(p))}>Remove</BUTTON>
              </div>
            </li>
          ))}
        </ul>}

        {cartItems.length > 0 && (<BUTTON ><Link to='/user/checkout'>Checkout</Link></BUTTON>)}
      </div>
    </div>

  )
}

export default Cart
