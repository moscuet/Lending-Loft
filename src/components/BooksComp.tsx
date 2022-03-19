import React, { useState, useEffect } from 'react'
import {  useSelector } from 'react-redux'

import userService from '../services/userService'
import { Product } from '../types'
import { AppState } from '../types'

import BookCard from '../components/BookCard'
import BookSearch from './searchBar/BookSearch'
import Loader from 'react-ts-loaders'
const BooksComp = () => {
  const cartProducts = useSelector((state: AppState) => state.order.inCart).map( p=>p._id)

  type ProductWithIncart = Product & { isIncart?: boolean }

  const [loading, setLoading] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)


  const [content, setContent] = useState<ProductWithIncart[]>([])
  const [updateContent, setUpdatedContent] = useState<ProductWithIncart[]>([])
  const [message, setMessage] = useState('')
  
  type Handleseacrh = (word:string) =>void

  const handleSearch:Handleseacrh =(searchword) =>{
    console.log('search word $$$$$$',searchword, typeof(searchword))
    const books = content.filter( book => {
      console.log(book.authors.map( author=>author.firstName+ ' '+ author.lastName))
      return book.title.toLowerCase().includes(searchword.toLowerCase())
      || book.authors.map(author=>( author.firstName + ' '+ author.lastName)).toString().toLowerCase().includes(searchword.toLowerCase())
      || book.genres.toString().toLowerCase().includes(searchword.toLowerCase())
    })
    setUpdatedContent(books)
  }


  useEffect(() => {
    setLoading(true)
    userService.getPublicContent().then(
      (response) => {
        setLoading(false)
        setLoadingSuccess(true)
        const updatedProduct: ProductWithIncart[] = response.data.map(
          (prod: ProductWithIncart) => {
            prod.isIncart = cartProducts.includes(prod._id)
            return prod
          }
        )
        setContent(updatedProduct)
        setUpdatedContent(updatedProduct)

      },
      (error) => {
        setLoading(false)
        setLoadingSuccess(false)
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
  console.log(loading)
  return (
    <>
      { 
        loading && <div>
          <Loader type="spinner" color="blue" />
        </div>
      }
      {loadingSuccess && (
        <div style={{ width: '100%' }}>
          {
            message?( <p>{message}</p>):
              (<>
                <div> <BookSearch handleSearch ={handleSearch} /> </div>
                { updateContent.length===0? (<p style = {{ width:'500px', margin: '0 auto'}}>No book found, change search word</p>):
                  <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {updateContent.map((book) => (
                      <li key={book._id}>
                        <BookCard {...book} />
                      </li>
                    ))}
                  </ul>}
              </>
              )
          }
        </div>
      )}
    </>
  )
}
export default BooksComp
