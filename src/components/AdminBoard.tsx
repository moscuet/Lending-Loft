import React from 'react'
import { useState, useEffect } from 'react'

import AddBook from './AddBook'
import AddAuthor from './AddAuthor'
import Users from './Users'
import Books from './Books'
import Authors from './Authors'
import userService from '../services/userService'
import EventBus from '../common/EventBus'
import { NavLink, Route, Switch } from 'react-router-dom'
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
    <div className='adminboard-container'>
      <div className= 'adminboard-container_nav'>
        <NavLink to={`${path}`}>Borrows</NavLink>
        <NavLink to={`${path}/users`}>Users</NavLink>
        <NavLink to={`${path}/books`}>Books</NavLink>
        <NavLink to={`${path}/authors`}>authors</NavLink>
        <NavLink to={`${path}/addbook`}>Add Book</NavLink>
        <NavLink to={`${path}/addauthor`}>Add Author</NavLink>
      </div>
      <div>
        <Switch>
          <Route exact path={`${path}`} component={BorrowList} />
          <Route exact path={`${path}/users`} component={Users} />
          <Route exact path={`${path}/books`} component={Books} />
          <Route exact path={`${path}/authors`} component={Authors} />
          <Route exact path={`${path}/addbook`} component={AddBook} />
          <Route exact path={`${path}/addauthor`} component={AddAuthor} />
          <Route exact path={`${path}/:id`} component={BorrowList} />
        </Switch>
      </div>
    </div>
  )
}

export default AdminBoard
