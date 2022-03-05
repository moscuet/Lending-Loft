import React from 'react'
// import { ErrorMessage, Field, Form, Formik } from 'formik'
// import * as Yup from 'yup'

//import { useState,  useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../types'
//import { AppState } from "../types";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeProduct } from '../redux/actions'

import './cart.css'
function Cart() {
  const cartItems = useSelector((state: AppState) => state.order.inCart)
  console.log(cartItems)
  const dispatch = useDispatch()

  return (
    <div className="cart">
      <h2 className="cart_title"> Cart </h2>
      {cartItems.length <= 0 && <div>No products in cart</div>}
      <ul>
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
            <div>{`by ${p.authors[0].firstName} ${p.authors[0].lastName}, ${p.edition}`}</div>
            <div>
              {}
            </div>
            <div>
              <button onClick={() => dispatch(removeProduct(p))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cart

/*
() => {
                type Quantity = {
                  quantity: number
                }
                const [quantity, setQuantity] = useState<Quantity>({
                  quantity: 0,
                })

                setQuantity({ quantity: 1 })
                function validationSchema() {
                  return Yup.object().shape({
                    quantity: Yup.number().required('First Name is required'),
                  })
                }
                function handleSubmit(formValue: { quantity: number }) {}

                return (
                  <Formik
                    enableReinitialize
                    initialValues={quantity}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="form-group">
                        <label htmlFor="quantiy">quantiy</label>
                        <Field
                          name="quantiy"
                          type="text"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="quantiy"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </Form>
                  </Formik>
                )
              }
              */
