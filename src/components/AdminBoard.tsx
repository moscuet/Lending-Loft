import React from 'react'
import { useState, useEffect } from "react";

import AddBook from './AddBook';
import AddAuthor from './AddAuthor';
import Users from './Users'
import Books from './Books'
import Authors from './Authors'
import userService from "../services/userService";
import EventBus from "../common/EventBus";

const AdminBoard: React.FC = () => {

  const [ content, setContent] = useState('')

  const [ showUser, setShowUser] = useState(true)
  const [ showBooks, setShowBooks] = useState(false)
  const [ showAuthors, setShowAuthors] = useState(false)
  const [ showAddBook, setShowAddBook] = useState(false)
  const [ showAddAuthor, setShowAddAuthor] = useState(false)

  
  useEffect(() => {
    userService.getCustomerBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  console.log(content)
  const handleShowUser = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowUser(true)
    setShowBooks(false)
    setShowAuthors(false)
    setShowAddBook(false)
    setShowAddAuthor(false)
  }
  const handleShowBooks = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowUser(false)
    setShowBooks(true)
    setShowAuthors(false)
    setShowAddBook(false)
    setShowAddAuthor(false)
  }
  const handleShowAuthors = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowUser(false)
    setShowBooks(false)
    setShowAuthors(true)
    setShowAddBook(false)
    setShowAddAuthor(false)
  }

  const handleAddBook = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowUser(false)
    setShowBooks(false)
    setShowAuthors(false)
    setShowAddBook(true)
    setShowAddAuthor(false)
  }
  const handleAddAuthor = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowUser(false)
    setShowBooks(false)
    setShowAuthors(false)
    setShowAddBook(false)
    setShowAddAuthor(true)
  }


  return (
    <div>
      <button onClick = {handleShowUser }>User</button>
      <button onClick = {handleShowBooks }>Books</button> 
      <button onClick = {handleShowAuthors }>Authors</button> 
      <button onClick = {handleAddBook}>Add Book</button>
      <button onClick = {handleAddAuthor}>Add Author</button>

      { showUser && (<Users />)}
      { showBooks && (<Books/>)}
      { showAuthors && (<Authors/>)}
      { showAddBook && (<AddBook/>)}
      { showAddAuthor && (<AddAuthor/>)}
    </div>
  );
};

export default AdminBoard;