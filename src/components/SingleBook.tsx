import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import userService from '../services/userService'
import { Product } from '../types'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/actions'

import { AppState } from '../types'
import {  useSelector } from 'react-redux'

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
  const isIncart = useSelector((state: AppState) => state.order.inCart).map( p=>p._id).includes(id)
  useEffect(() => {
    userService.getSingleBook(id).then(
      (response) => {
        if (response) setBook(response.data)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()

        // setMessage(_content);
        console.log(_content)
      }
    )
  }, [id])

  const {
    img,
    title,
    authors,
    publisherName,
    publishedYear,
    edition,
    pageCount,
    description,
    genres,
  } = book
  return (
    <div>
      <Card style={{ width: '85%' }}>
        <Card.Img variant="top" src={`${img}`} />
        <Card.Body>
          <Card.Title>
            <h1>{`${title}`} Single Book</h1>
          </Card.Title>
          <Card.Text>
            {' '}
            {`Author: ${authors
              .map((a) => a.firstName + ' ' + a.lastName)
              .join(',')}`}
          </Card.Text>
          <Card.Text> {`Publisher: ${publisherName}`}</Card.Text>
          <Card.Text> {`Year: ${publishedYear}`}</Card.Text>
          <Card.Text> {`Edition: ${edition}`}</Card.Text>
          <Card.Text> {`pages: ${pageCount}`}</Card.Text>
          <Card.Text> {`genres: ${genres}`}</Card.Text>
          <Card.Text> {`${description}`}</Card.Text>
          {!window.location.pathname.includes('admin') && (
            <Button
              variant="primary"
              onClick={() => dispatch(addProduct(book))}
              disabled={isIncart}
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
        {!window.location.pathname.includes('admin') && (
          <Card.Link href="/"> Back to home</Card.Link>
        )}
      </Card>
    </div>
  )
}
export default SingleBook
