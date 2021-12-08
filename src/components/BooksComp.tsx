import React, { useState, useEffect } from "react";
//import { useSelector } from 'react-redux'
//import { useDispatch } from 'react-redux'

import { useLocation } from 'react-router-dom';
//const { path } = useRouteMatch();
//let {url} = useRouteMatch()


import userService from '../services/userService'
import { Product} from '../types'
//import {  AppState } from '../types'

import BookCard from '../components/BookCard'



const  BooksComp = () => {
  //const dispatch = useDispatch()
  //const products = useSelector((state: AppState) => state.order.inCart)
  

  const [content, setContent] = useState<Product[]>([]);
  const [message, setMessage] = useState('');

  const {pathname} = useLocation();
  console.log(pathname)
  useEffect(() => {
    userService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setMessage(_content);
        console.log(error)
      }
    );
  }, []);

  console.log('content',content)
  console.log('message',message)

  return (
    <div>
      <ul>
        {content.map((book) => (
          <li key={book._id}>
            <BookCard {...book}/>
            {/* <Link to={`products/${book._id}`}><BookCard {...book}/></Link> */}
          </li>
        ))}
      </ul>

    </div>
  )
}
export default BooksComp