
import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import AddAuthor from './AddAuthor'
import Users from './Users'
import Books from './Books'
import Authors from './Authors'
import AddBook from './AddBook'
import AdminBorrowList from './AdminBorrowList'

import { NavLink } from 'react-router-dom'
import './adminboard.css'
const AdminBoard: React.FC = () => {

  const path = '/admin'

  return (
    <div className="adminboard-container">
      <div ><h2 style={{textAlign:'center'}}>Admin Board</h2></div>
      <div className="adminboard-container_nav">
        <NavLink to={`${path}/`}>Users</NavLink>
        <NavLink to={`${path}/borrows`}>Borrows</NavLink>
        <NavLink to={`${path}/books`}>Books</NavLink>
        <NavLink to={`${path}/authors`}>authors</NavLink>
        <NavLink to={`${path}/addbook`}>Add Book</NavLink>
        <NavLink to={`${path}/addauthor`}>Add Author</NavLink>
      </div>
      <div>
        <Switch>
          <Route path={'/'} element = {< Users/>} />
          <Route path={'/books'} element = {< Books/>}/> 
          <Route path={'/borrows/*'} element = {< AdminBorrowList/>}/>
          <Route path={`/authors`} element = {< Authors />}/> 
          <Route path={`/addauthor`} element ={< AddAuthor/>} />  
          <Route path={`/addbook`} element ={< AddBook/>} /> 
        </Switch>
      </div>
    </div>
  )
}

export default AdminBoard

