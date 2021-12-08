import React, {  ReactElement } from 'react'
import { Product} from '../types'
import { Card, Button } from "react-bootstrap";
export default function BookCard(book:Product):ReactElement {
  const {title,img,authors} = book
  
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Link href = {`books/${book._id}`}  > 
          <Card.Img variant="top" src={`${img}`} />
        </Card.Link>
        <Card.Body>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text> {`Author: ${authors.map(a => a.firstName+' '+ a.lastName).join(',')}`}</Card.Text>
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

