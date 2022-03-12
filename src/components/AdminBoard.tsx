import React from 'react'
import { useState, useEffect } from 'react'

import AddBook from './AddBook'
import AddAuthor from './AddAuthor'
import Users from './Users'
import Books from './Books'
import Authors from './Authors'
import userService from '../services/userService'
import EventBus from '../common/EventBus'
import { NavLink, Route, Routes as Switch } from 'react-router-dom'
import BorrowList from './userBoard/AdminBorrowList'
import './adminboard.css'
const AdminBoard: React.FC = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    userService.getCustomerBoard().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        setContent(_content)

        if (error.response && error.response.status === 401) {
          EventBus.dispatch('logout')
        }
      }
    )
  }, [])

  console.log(content)

  const path = '/admin'

  return (
    <div className="adminboard-container">
      <div className="adminboard-container_nav">
        <NavLink to={`${path}`}>Borrows</NavLink>
        <NavLink to={`${path}/users`}>Users</NavLink>
        <NavLink to={`${path}/books`}>Books</NavLink>
        <NavLink to={`${path}/authors`}>authors</NavLink>
        <NavLink to={`${path}/addbook`}>Add Book</NavLink>
        <NavLink to={`${path}/addauthor`}>Add Author</NavLink>
      </div>
      <div>
        <Switch>
          <Route path={`${path}`} > < BorrowList/> </Route>  
          <Route path={`${path}/users`} > < Users /> </Route> 
          <Route path={`${path}/books`} > < Books/> </Route> 
          <Route path={`${path}/authors`} > < Authors /> </Route> 
          <Route path={`${path}/addbook`} > < AddBook/> </Route> 
          <Route path={`${path}/addauthor`} > < AddAuthor/> </Route> 
          <Route path={`${path}/:id`} >BorrowList</Route> 
        </Switch>
      </div>
    </div>
  )
}

export default AdminBoard
