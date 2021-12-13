
import React from "react";
//import { useState,  useEffect } from 'react'
import {useSelector} from 'react-redux'
import { AppState } from "../types";
//import { AppState } from "../types";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {  removeProduct } from '../redux/actions'

function Cart() {
  const cartItems =  useSelector((state: AppState) => state.order.inCart)

  const dispatch = useDispatch()

  return (
    <div > 
      <h2> Cart </h2>
      {cartItems.length <= 0 && <div>No products in cart</div>}
      <ul>
        {cartItems.map((p) => (
          <li key={p._id}>
            <Link to={`/books/${p._id}`}>{`${p.title}`}</Link>
            <button onClick={() => dispatch(removeProduct(p))}>Remove</button>
          </li>
        ))}
      </ul>
    </div >
  );
}
  
export default Cart