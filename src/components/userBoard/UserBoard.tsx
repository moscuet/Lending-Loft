import React from 'react'
import { NavLink } from 'react-router-dom'
import MultiStepsCheckout from '../multistepsCheckoutForm/MultiStepsCheckout'
import { useSelector } from 'react-redux'
import { Routes as Switch, Route } from 'react-router'

import './userboard.css'
import UserBorrowList from './UserBorrowList'
import Setting from './Setting'

const UserBoard: React.FC = () => {
  const path = '/user'
  const inCart = useSelector(
    (state: { order: { inCart: [] } }) => state.order.inCart
  )

  return (
    <div className="userboard-container">
      <div ><h2 style={{textAlign:'center'}}>User Board</h2></div>
      <div className="userboard-container_nav">
        <NavLink to={`${path}`}>setting</NavLink>
        <NavLink to={`${path}/borrows`}>Borrowed</NavLink>
      </div>

      <div>
        <Switch>
          <Route path={`/`} element = {   <Setting />}/>
          <Route path={`/checkout`}  element = {<MultiStepsCheckout inCart={inCart} />} />
          <Route  path={`/borrows/*`} element = {<UserBorrowList/>} /> 
        </Switch>
      </div>
    </div>
  )
}

export default UserBoard
