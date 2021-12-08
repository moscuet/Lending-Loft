import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Product, AppState } from '../types'
import { removeProduct } from '../redux/actions'
import userService from '../services/userService'


import BooksComp from '../components/BooksComp'
export default function Home() {
  const dispatch = useDispatch()

  const products = useSelector((state: AppState) => state.order.inCart)
  const [content, setContent] = useState<Product | undefined>(undefined);
  const [message, setMessage] = useState('');


  useEffect(() => {
    userService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_content);
      }
    );
  }, []);

  console.log(content,message)

  // const handleAddProduct = () => {
  //   const product: Product = {
  //     _id: (+new Date()).toString(),
  //     title: 'bbok1',
  //     ISBN: "",
  //     publisherName: "",
  //     authors: [],
  //     publishedYear: 0,
  //     genres: [],
  //     description: "",
  //     edition: "",
  //     pageCount: 0,
  //     img:''
  //   }
  //   dispatch(addProduct(product))
  // }



  return (
    <>
      <h1>Home page</h1>
      <BooksComp />
   
      {products.length <= 0 && <div>No products in cart</div>}
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <Link to={`/products/${p._id}`}>{`${p.title}`}</Link>

            {'  '}

            <button onClick={() => dispatch(removeProduct(p))}>Remove</button>
          </li>
        ))}
      </ul>
      {/* <button onClick={handleAddProduct}>Add product</button> */}
    </>
  )
}
