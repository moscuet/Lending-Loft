import React, { useState, useEffect } from 'react'
//import { useSelector } from 'react-redux'
//import { useDispatch } from 'react-redux'

//const { path } = useRouteMatch();
//let {url} = useRouteMatch()
import userService from '../services/userService'
import { Product } from '../types'
//import {  AppState } from '../types'

import BookCard from '../components/BookCard'

import { AppState } from '../types'
// const state = useSelector((state: AppState) => state)
import {  useSelector } from 'react-redux'

const BooksComp = () => {
  //const dispatch = useDispatch()
  const cartProducts = useSelector((state: AppState) => state.order.inCart).map( p=>p._id)

  type ProductWithIncart = Product & { isIncart?: boolean }
  const [content, setContent] = useState<ProductWithIncart[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    userService.getPublicContent().then(
      (response) => {
        const updatedProduct: ProductWithIncart[] = response.data.map(
          (prod: ProductWithIncart) => {
            prod.isIncart = cartProducts.includes(prod._id)
            return prod
          }
        )
        setContent(updatedProduct)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()

        setMessage(_content)
        console.log(error)
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log('content', content)
  console.log('message', message)

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center' }}> All books </h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {content.map((book) => (
          <li key={book._id}>
            <BookCard {...book} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default BooksComp
