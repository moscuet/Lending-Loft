import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Product } from '../types'
import { Card, Button } from 'react-bootstrap'
import { addProduct } from '../redux/actions'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const ImageWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: 75%; 
  position: relative;
`;

const StyledCardImage = styled(Card.Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledCard = styled(Card)`
  background: var(--card-bg-color);
  color: var(--card-text-color);
  width: 18rem;

  .card-title {
    font-size: 1.2em;
  }

  .card-text {
    font-size: 1em;
  }

  .btn-primary {
    background: var(--button-primary-bg-color);
    border: none;
    color: var(--button-primary-text-color);

    &:hover {
      background: var(--link-hover-color);
    }
  }

  @media (max-width: 980px) {
    width: 15rem;
  }

  @media (max-width: 836px) {
    width: 18rem;
  }

  @media (max-width: 650px) {
    width: 15rem;
  }
`;

const BookCardWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px; 
`;

export default function BookCard(book: (Product & { isIncart?: boolean })): ReactElement {

  const { title, img, authors, genres } = book
  const dispatch = useDispatch()
  const [cartState, setCartstate] = useState(book.isIncart)
  const onclick = () => {
    dispatch(addProduct(book))
    setCartstate(!cartState)
  }

  return (
    <BookCardWrapper>
      <StyledCard>
        <Link to={`/books/${book._id}`}>
          <ImageWrapper>
            <StyledCardImage variant="top" src={`${img}`} />
          </ImageWrapper>
        </Link>
        <Card.Body>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text> <p> Genres: <span style={{ fontSize: '14px' }}> {genres.join(', ')} </span> </p> </Card.Text>          <Card.Text>
            {`By ${authors.map((a) => a.firstName + ' ' + a.lastName).join(',')}`}
          </Card.Text>
          <Button variant="primary" onClick={onclick} disabled={cartState}>
            Add to cart
          </Button>
        </Card.Body>
      </StyledCard>
    </BookCardWrapper>
  )

}