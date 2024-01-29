import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import userService from '../services/userService'
import { Product } from '../types'
import { AppState } from '../types'

import BookCard from '../components/BookCard'
import BookSearch from './searchBar/BookSearch'
import Loader from 'react-ts-loaders'
import styled from 'styled-components';
import { LoaderContainer } from './ui/StyledComponenet'
import NotFound from './ui/NotFound'



const BookListItem = styled.li`
  margin: 4px;
  list-style-type: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  &:hover {
    transform: scale(1.03); 
  }
`;


const BooksComp = () => {
  const cartProducts = useSelector((state: AppState) => state.order.inCart).map(p => p._id)

  type ProductWithIncart = Product & { isIncart?: boolean }
  type Handleseacrh = (word: string) => void

  const [loading, setLoading] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [content, setContent] = useState<ProductWithIncart[]>([])
  const [updateContent, setUpdatedContent] = useState<ProductWithIncart[]>([])
  const [message, setMessage] = useState('')

  const arrayOfPath = window.location.pathname.split("/")

  const handleSearch: Handleseacrh = (searchword) => {
    const books = content.filter(book => {
      return book.title.toLowerCase().includes(searchword.toLowerCase())
        || book.authors.map(author => (author.firstName + ' ' + author.lastName)).toString().toLowerCase().includes(searchword.toLowerCase())
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
        let updatedProduct: ProductWithIncart[] = response.data.map(
          (prod: ProductWithIncart) => {
            prod.isIncart = cartProducts.includes(prod._id)
            return prod
          }
        )
        if (arrayOfPath.length === 4) {
          const catagorisedProd = updatedProduct.filter(prod => prod.genres.toString().includes(arrayOfPath[3]))
          updatedProduct = catagorisedProd
        }
        setContent(updatedProduct)
        setUpdatedContent(updatedProduct)
      },
      (error) => {
        setLoading(false)
        setLoadingSuccess(false)
        const _content =
          error.message || (error.response && error.response.data) ||
          error.toString()
        console.log('####', _content)
        setMessage(_content)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      {
        loading && <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      }

      {!loadingSuccess && <NotFound message={message} />}

      {loadingSuccess && (
        <div style={{ width: '100%' }}>
          {
            message ? (<p>{message}</p>) :
              (<>
                <div> <BookSearch handleSearch={handleSearch} /> </div>
                {updateContent.length === 0 ? (<p style={{ width: '500px', margin: '0 auto' }}>Oops! No books found. Please try a different keyword</p>) :
                  <ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0, justifyContent: 'center' }}>
                    {updateContent.map((book) => (
                      <BookListItem key={book._id}>
                        <BookCard {...book} />
                      </BookListItem>
                    ))}
                  </ul>
                }
              </>
              )
          }
        </div>
      )}
    </>
  )
}
export default BooksComp
