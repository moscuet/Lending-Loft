import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import userService from '../services/userService'
import { Product } from '../types'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/actions'

import { AppState } from '../types'
import { useSelector } from 'react-redux'

import styled from 'styled-components';
import { BUTTON, SECONDARYBUTTON } from './ui/StyledComponenet'

const CONTAINER = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: row; 

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;


type QuizParams = {
  id: string
}
const SingleBook = () => {
  const { id } = useParams<QuizParams>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/book-placeholder.png';
  };
  function handleNavigation() {
    navigate('/');
  }
  return (
    <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
      {book._id ? (
        <Card style={{ width: '85%', maxWidth: '1400px', backgroundColor: 'transparent', border: 'none' }}>
          <CONTAINER>
            <div style={{ maxWidth: '1080px', width: '100%' }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <Card.Img
                  variant="top"
                  src={book.img}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={handleImageError}
                />
              </div>
              <Card.Title style={{ marginTop: '10px', textAlign: 'center' }}>
                <h6>{book.title}</h6>
              </Card.Title>
            </div>

            <div style={{ padding: '20px', minWidth: '200px', maxWidth: '300px' }}>
              <Card.Text>
                <strong>Author:</strong> {book.authors && book.authors.length > 0 ? book.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ') : 'Not available'}
              </Card.Text>
              <Card.Text>
                <strong>Publisher:</strong> {book.publisherName || 'Not available'}
              </Card.Text>
              <Card.Text>
                <strong>Year:</strong> {book.publishedYear || 'Not available'}
              </Card.Text>
              <Card.Text>
                <strong>Edition:</strong> {book.edition || 'Not available'}
              </Card.Text>
              <Card.Text>
                <strong>Pages:</strong> {book.pageCount || 'Not available'}
              </Card.Text>
              <Card.Text>
                <strong>Genres:</strong> {book.genres && book.genres.length > 0 ? book.genres.join(', ') : 'Not available'}
              </Card.Text>
            </div>
          </CONTAINER >

          <Card.Text >
            {book.description}
          </Card.Text>
          <div>
            <BUTTON
              onClick={() => dispatch(addProduct(book))}
              disabled={isIncart}
              style={{ width: '150px' }}
            >
              Add to cart
            </BUTTON>
            <SECONDARYBUTTON
              style={{ width: '150px', marginTop: '10px' }}
              onClick={handleNavigation}
            >
              Back To Home
            </SECONDARYBUTTON>
          </div>
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
