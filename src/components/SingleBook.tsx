import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import userService from '../services/userService'
import { Product } from '../types'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/actions'

import { AppState } from '../types'
import { useSelector } from 'react-redux'
import { BUTTON } from './SignupForm'

import styled from 'styled-components';

const CONTAINER = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: row; 

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;


type QuizParams = {
  id: string
}
const SingleBook = () => {
  const { id } = useParams<QuizParams>()
  const dispatch = useDispatch()

  const [book, setBook] = useState<Product & { isIncart?: boolean }>({
    _id: '',
    title: '',
    ISBN: '',
    publisherName: '',
    authors: [],
    publishedYear: 0,
    genres: [],
    description: '',
    edition: '',
    pageCount: 0,
    img: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const isIncart = useSelector((state: AppState) => state.order.inCart).map(p => p._id).includes(id)
  useEffect(() => {
    userService.getSingleBook(id).then(
      (response) => {
        if (response) setBook(response.data)
      },
      (error: Error) => {
        setErrorMessage(`No book Found: ${error.message}`)
      }
    )
  }, [id])

  return (
    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
      {book._id ? (
        <Card style={{ width: '85%', maxWidth: '1280px', backgroundColor: 'transparent', border: 'none' }}>
          <CONTAINER>
            <div>
              <Card.Img
                variant="top"
                src={book.img}
                style={{ maxWidth: '480px', width: '100%', objectFit: 'cover' }}
              />
              <Card.Title style={{ marginTop: '20px', textAlign: 'center' }}>
                <h6>{book.title}</h6>
              </Card.Title>
            </div>

            <div style={{ padding: '20px' }}>
              <Card.Text>{`Author: ${book.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}`}</Card.Text>
              <Card.Text>{`Publisher: ${book.publisherName}`}</Card.Text>
              <Card.Text>{`Year: ${book.publishedYear}`}</Card.Text>
              <Card.Text>{`Edition: ${book.edition}`}</Card.Text>
              <Card.Text>{`Pages: ${book.pageCount}`}</Card.Text>
              <Card.Text>{`Genres: ${book.genres.join(', ')}`}</Card.Text>
            </div>
          </CONTAINER >

          <Card.Text style={{ padding: '0 20px' }}>
            {book.description}
          </Card.Text>
          {!window.location.pathname.includes('admin') && (
            <BUTTON
              onClick={() => dispatch(addProduct(book))}
              disabled={isIncart}
              style={{ maxWidth: '150px' }}
            >
              Add to cart
            </BUTTON>
          )}
        </Card>
      ) : (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
export default SingleBook
