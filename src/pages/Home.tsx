import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Product, AppState } from '../types'
import { addProduct, removeProduct } from '../redux/actions'

import userService from '../services/userService'
import NavBar from '../components/nabBar/NavBar'
//import RegisterForm from '../components/RegisterForm'
import SigninForm from '../components/SigninForm'
export default function Home() {
  
  const dispatch = useDispatch()

  const [content, setContent] = useState<string>("");


  const products = useSelector((state: AppState) => state.order.inCart)


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

        setContent(_content);
      }
    );
  }, []);


  const handleAddProduct = () => {
    const product: Product = {
      id: (+new Date()).toString(),
      title: 'bbok1',
      ISBN: "",
      publisherName: "",
      authors: [],
      publishedYear: 0,
      genres: [],
      description: "",
      edition: "",
      pageCount: 0
    }
    dispatch(addProduct(product))
  }

  return (
    <>
      <NavBar />
      <h1>Home page</h1>
      <div>
        <h3>{content}</h3>
      </div>

      {products.length <= 0 && <div>No products in cart</div>}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{`${p.title}`}</Link>

            {'  '}

            <button onClick={() => dispatch(removeProduct(p))}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddProduct}>Add product</button>
      {/* <RegisterForm/> */}
      <SigninForm history={[]} />
    </>
  )
}
