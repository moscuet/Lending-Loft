import React, {  ReactElement } from 'react'
import { Product} from '../types'
import { Card, Button } from "react-bootstrap";

export default function BookCard(book:Product):ReactElement {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Link href = {`products/${book._id}`}  >
          <Card.Img variant="top" src="https://images.unsplash.com/photo-1532348374062-fee19177e98f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
        </Card.Link>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
          </Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

