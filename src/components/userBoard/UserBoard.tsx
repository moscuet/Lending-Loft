import React from 'react'
//import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
// import userService from "../../services/userService";
// import EventBus from "../../common/EventBus";
import MultiStepsCheckout from '../multistepsCheckoutForm/MultiStepsCheckout'
import {  useSelector} from "react-redux";

import './userboard.css'
import UserBorrowList from './UserBorrowList'
import Setting from './Setting'

import { Switch, Route } from 'react-router'
const UserBoard: React.FC = () => {
  const path = '/user'
  const inCart = useSelector((state: { order: {inCart:[]} }) => state.order.inCart)

  return (
    <div className="userboard-container">
      <NavLink to={`${path}/setting`}>setting</NavLink>
      <NavLink to={`${path}/borrows`}>Borrowed</NavLink>
      <div>
        <Switch>
          <Route exact path={`${path}/setting`}> <Setting/></Route>
          <Route exact path={`${path}/checkout`}> <MultiStepsCheckout inCart = {inCart}/></Route>
          <Route exact path={`${path}/borrows`} component={UserBorrowList} />
          <Route exact path={`${path}/borrows/:id`} component={UserBorrowList} />
        </Switch>
      </div>
    </div>
  )
}

export default UserBoard
