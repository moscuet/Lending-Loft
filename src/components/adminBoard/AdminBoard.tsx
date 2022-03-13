import React from 'react'
import { useState, useEffect } from 'react'

//import AddBook from './AddBook'
import AddAuthor from './AddAuthor'
import Users from './Users'
import Books from './Books'
import Authors from './Authors'
import BorrowList from './AdminBorrowList'
import { Route, Routes as Switch } from 'react-router-dom'

import userService from '../../services/userService'
import EventBus from '../../common/EventBus'
import { NavLink } from 'react-router-dom'
import './adminboard.css'
import AdminBorrowList from './AdminBorrowList'
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
      <div ><h2 style={{textAlign:'center'}}>Admin Board</h2></div>
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
          <Route path={'/'} element = {< BorrowList/>} />
          <Route path={'/books'} element = {< Books/>}/> 
          <Route path={'/users'} element = {< Users />}/>
          <Route path={`/authors`} element = {< Authors />}/> 
          <Route path={`/addauthor`} element ={< AddAuthor/>} />  
          <Route path={`/addbook`} element ={< AdminBorrowList/>} /> 
        </Switch>
      </div>
    </div>
  )
}

export default AdminBoard
