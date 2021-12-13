import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'

import { Product, AppState } from '../types'
import userService from '../services/userService'


import BooksComp from '../components/BooksComp'
export default function Home() {

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

  console.log(message, content,products)

  return (
    <>
      <BooksComp /> 
    </>
  )
}
