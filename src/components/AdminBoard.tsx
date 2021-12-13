import React from 'react'
//import {useParams } from "react-router-dom";
//import { createBrowserHistory } from 'history';
//import { Switch, Route } from 'react-router';
//import { createBrowserHistory } from 'history';
import { useState, useEffect } from "react";

import AddBook from './AddBook';
import Users from './Users'
import userService from "../services/userService";
import EventBus from "../common/EventBus";
//import AddBook from './AddBook';
//import Cart from './Cart';
//import AddBook from './AddBook';

const BoardUser: React.FC = () => {
  

  const [ content, setContent] = useState('')

  const [ showUser, setShowUser] = useState(true)
  const [ showAddUser, setShowAddUser] = useState(false)

  

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
    setShowAddUser(false)
  }
  const handleAddBook = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowUser(false)
    setShowAddUser(true)
  }


  return (
    <div>
      <button onClick = {handleShowUser }>User</button> <button onClick = {handleAddBook}>Add Book</button>
      { showUser && (
        <Users />
      )
      }
      { showAddUser && (
        <AddBook/>
      )
      }
      
    </div>
  );
};

export default BoardUser;