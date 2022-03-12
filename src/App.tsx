import React, { Fragment, useEffect } from 'react'
//import { useState, useEffect } from "react";
import { Routes as Switch, Route } from 'react-router-dom'
//import {useHistory} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { clearMessage } from './redux/actions'

import AdminRoute from './components/Routing/AdminRoute'
import AdminBoard from './components/AdminBoard'

import UserRoute from './components/Routing/UserRoute'
import UserBoard from './components/userBoard/UserBoard'

import NavBar from './components/nabBar/NavBar'
import Signin from './components/SigninForm'
import Signup from './components/SignupForm'
import Home from './pages/Home'
import SingleBook from './components/SingleBook'
import Cart from './components/Cart'

const App: React.FC = () => {
  const history = createBrowserHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch, history])

  //const order = useSelector((state: { order: {cart:[]} }) => state.order)
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path='/admin' element={<AdminRoute/>}/>
        <Route path='/user' element={<UserRoute/>}/>
        <
          Route  path='/admin' element={<AdminRoute/>}>
          <Route path='/admin' element={<AdminBoard/>}/>
        </Route>
        {/* <AdminRoute path="/admin" component={AdminBoard} /> */}
         
        {/* <UserRoute path="/user" component={UserBoard} /> */}
          
          
        {/* <Route path="/signup">
          <Signupp history={history} />
        </Route> */}

        <Route path='/signup' element = {<Signup history={history}/>} />
        <Route path='/signin' element = {<Signin history={history}/>} />
        <Route path='/user' element =   {<UserBoard />} />
        <Route path='/books/:id' element =   { <SingleBook />} />

        <Route path='/cart/:id' element =   {  <SingleBook />} />
        <Route path='/cart' element =   { <Cart />} />

        <Route path='/' element =   { <Home />} />
      </Switch>
    </Fragment>
  )
}
export default App
