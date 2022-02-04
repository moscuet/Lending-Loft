import React, { useEffect} from 'react'
//import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
// import userService from "../../services/userService";
// import EventBus from "../../common/EventBus";

import './userboard.css'
import BorrowList from './BorrowList'
import Setting from './Setting'

import { Switch , Route} from 'react-router';
import { useParams} from 'react-router';
import { useState} from 'react';
import { Book, TCustomer } from '../../types'

import borrowservice from '../../services/borrowservice'

  type  Borrow = {
  bookId: [Book]
  customerId: [TCustomer]
  borrowDate: Date
  returnDate: Date
  isReturned: Boolean
  _id:string
}
const SingleBorrow = () =>{
  const [ borrow, setBorrow] = useState<Borrow>()
  const {id}= useParams<{id:string}>();
  console.log(id,borrow)
 
  useEffect ( ()=>{
    borrowservice.getSingleBorrow(id).then( res=>{
      setBorrow(res.data)
    })
 
  },[])
  return (
    <div>
      <div> 
        <h1>{`${borrow?.customerId[0].firstName} ${borrow?.customerId[0].lastName}`}</h1>
      </div>
      
      <div>

      </div>
    </div>
  )
}






const AdminBoard: React.FC = () => {



  const path = '/user';
  return (
    <div className='userboard-container'>
      <NavLink to = {`${path}/setting`}>setting</NavLink>
      <NavLink to = {`${path}/borrow`}>Borrowed</NavLink>
      <div>
        <Switch>
          <Route exact path={`${path}/borrow/:id`} component={SingleBorrow} />
          <Route exact path={`${path}/borrow`} component={BorrowList} />
          <Route exact path={`${path}/setting`}component={Setting} />
        </Switch>
      </div>
    </div>
  );
};


export default AdminBoard;