import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'

import { Product } from '../types'
import { Card, Button } from 'react-bootstrap'
import { addProduct } from '../redux/actions'

export default function BookCard(book: (Product & {isIncart?:boolean})): ReactElement {
  const { title, img, authors } = book
  const dispatch = useDispatch()
  console.log('frooooooom bookcard',book)
  return (
    <div style={{ width: '100%' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Link href={`books/${book._id}`}>
          <Card.Img variant="top" src={`${img}`} />
        </Card.Link>
        <Card.Body>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text>
            {' '}
            {`Author: ${authors
              .map((a) => a.firstName + ' ' + a.lastName)
              .join(',')}`}
          </Card.Text>
          <Button variant="primary"  onClick={() => dispatch(addProduct(book))} disabled={book.isIncart}>
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

//<button onClick={() => dispatch(removeProduct(p))}>Remove</button>
