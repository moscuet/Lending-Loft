import React from 'react'
//import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
// import userService from "../../services/userService";
// import EventBus from "../../common/EventBus";

import './userboard.css'
import UserBorrowList from './UserBorrowList'
import Setting from './Setting'

import { Switch, Route } from 'react-router'
const UserBoard: React.FC = () => {
  const path = '/user'
  return (
    <div className="userboard-container">
      <NavLink to={`${path}/setting`}>setting</NavLink>
      <NavLink to={`${path}`}>Borrowed</NavLink>
      <div>
        <Switch>
          <Route exact path={`${path}/setting`} component={Setting} />
          <Route exact path={`${path}`} component={UserBorrowList} />
          <Route exact path={`${path}/:id`} component={UserBorrowList} />

        </Switch>
      </div>
    </div>
  )
}

export default UserBoard
