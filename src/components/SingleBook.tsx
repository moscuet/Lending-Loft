import React, {useEffect, useState} from 'react'
import { Button, Card } from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import userService from '../services/userService';
import { Product } from '../types';
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/actions';

const SingleBook =() => {
 
  const dispatch= useDispatch()
  const id:string = useParams() || '';
  const [book, setBook] = useState<Product>({
    _id:'',
    title:'',
    ISBN:'',
    publisherName:'',
    authors: [],
    publishedYear:0,
    genres: [],
    description:'',
    edition:'',
    pageCount:0,
    img:''
  });
  //const [message, setMessage] = useState<string>();

  
  useEffect(() => {
    userService.getSingleBook(id).then(
      (response) => {
        if(response)setBook(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        // setMessage(_content);
        console.log(_content)
      }
    );
  }, [id]);

  const {img, title, authors, publisherName,publishedYear,edition,pageCount, description, genres} = book
  return (
    <div>
      <Card style={{ width: '85vw' }}>
        <Card.Img variant="top" src={`${img}`} />
        <Card.Body>
          <Card.Title><h1>{`${title}`}</h1></Card.Title>
          <Card.Text> {`Author: ${authors.map(a => a.firstName+' '+ a.lastName).join(',')}`}</Card.Text>
          <Card.Text> {`Publisher: ${publisherName}`}</Card.Text>
          <Card.Text> {`Year: ${publishedYear}`}</Card.Text>
          <Card.Text> {`Edition: ${edition}`}</Card.Text>
          <Card.Text> {`pages: ${pageCount}`}</Card.Text>
          <Card.Text> {`genres: ${genres}`}</Card.Text>
          <Card.Text> {`${description}`}</Card.Text>
          <Button variant="primary" onClick = {()=>dispatch(addProduct(book))}>Add to cart</Button>
        </Card.Body>
        <Card.Link href = '/' > Back to home</Card.Link>
      </Card>
    </div>
  )
}
export default SingleBook


