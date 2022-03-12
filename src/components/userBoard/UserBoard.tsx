import React from 'react'
//import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
// import userService from "../../services/userService";
// import EventBus from "../../common/EventBus";
import MultiStepsCheckout from '../multistepsCheckoutForm/MultiStepsCheckout'
import { useSelector } from 'react-redux'

import './userboard.css'
import UserBorrowList from './UserBorrowList'
import Setting from './Setting'

import { Routes as Switch, Route } from 'react-router'
const UserBoard: React.FC = () => {
  const path = '/user'
  const inCart = useSelector(
    (state: { order: { inCart: [] } }) => state.order.inCart
  )

  return (
    <div className="userboard-container">
      <NavLink to={`${path}/setting`}>setting</NavLink>
      <NavLink to={`${path}/borrows`}>Borrowed</NavLink>
      <div>
        <Switch>
          <Route path={`${path}/setting`}>
            <Setting />
          </Route>
          <Route path={`${path}/checkout`}>
            <MultiStepsCheckout inCart={inCart} />
          </Route>
          <Route  path={`${path}/borrows`}> <UserBorrowList/> </Route>
          <Route path={`${path}/borrows/:id`}> <UserBorrowList /></Route>
        </Switch>
      </div>
    </div>
  )
}

export default UserBoard
