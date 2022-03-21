import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Product } from '../types'
import { Card, Button } from 'react-bootstrap'
import { addProduct } from '../redux/actions'

export default function BookCard(book: (Product & {isIncart?:boolean})): ReactElement {
  const { title, img, authors,genres } = book
  const dispatch = useDispatch()
  const [cartState, setCartstate ] = useState(book.isIncart)
  const onclick = () =>{
    dispatch(addProduct(book))
    setCartstate(!cartState)
  }
  return (
    <div className='bookcomp-wrapper' style={{ width: '100%' }}>
      <Card style={{ width: '18rem' }}>
        <Card.Link href={`books/${book._id}`}>
          <Card.Img variant="top" src={`${img}`} />
        </Card.Link>
        <Card.Body>
          <Card.Title>{`${title}`}<p>{`${genres.toString()}`}</p></Card.Title>
          <Card.Text>
            {`Authors: ${authors
              .map((a) => a.firstName + ' ' + a.lastName)
              .join(',')}`
            }
          </Card.Text>
       
          <Button variant="primary"  onClick={onclick} disabled={cartState}>
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

