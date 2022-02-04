import React, { useState, useEffect } from "react";
//import { useSelector } from 'react-redux'
//import { useDispatch } from 'react-redux'

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
    <div style={{width: "100%"}} >
      <h2 style={{textAlign:"center"}}> All books </h2>
      <ul style= {{display:"flex", flexWrap:"wrap"}}>
        {content.map((book) => (
          <li key={book._id}>
            <BookCard {...book}/>
          </li>
        ))}
      </ul>

    </div>
  )
}
export default BooksComp