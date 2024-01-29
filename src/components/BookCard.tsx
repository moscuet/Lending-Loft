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

const StyledTextSingleLine = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const StyledCardFooter = styled.div`
  margin-top: auto;
`;

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = '/assets/book-placeholder.png';
};


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
            <StyledCardImage
              variant="top"
              src={`${img}`}
              onError={handleImageError}
            />
          </ImageWrapper>
        </Link>
        <Card.Body>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text>
            <StyledTextSingleLine>
              Genres: {genres.join(', ')}
            </StyledTextSingleLine>
            <StyledTextSingleLine>
              By {authors.map((a) => a.firstName + ' ' + a.lastName).join(', ')}
            </StyledTextSingleLine>
          </Card.Text>
          <StyledCardFooter>
            <Button variant="primary" onClick={onclick} disabled={cartState}>
              Add to cart
            </Button>
          </StyledCardFooter>
        </Card.Body>
      </StyledCard>
    </BookCardWrapper>
  );
}