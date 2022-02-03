import React from 'react'
//import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
// import userService from "../../services/userService";
// import EventBus from "../../common/EventBus";

import './userboard.css'
import BorrowList from './BorrowList'
import Setting from './Setting'

import { Switch , Route} from 'react-router';



const AdminBoard: React.FC = () => {



  const path = '/user';
  return (
    <div className='userboard-container'>
      <NavLink to = {`${path}/setting`}>setting</NavLink>
      <NavLink to = {`${path}/borrow`}>Borrow</NavLink>
      <div>
        <Switch>
          <Route exact path={`${path}/borrow`} component={BorrowList} />
          <Route exact path={`${path}/setting`}component={Setting} />
        </Switch>
      </div>
    </div>
  );
};


export default AdminBoard;