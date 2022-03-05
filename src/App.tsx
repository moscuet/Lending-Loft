import React, {  useEffect } from "react";
//import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//import {useHistory} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { useDispatch} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { clearMessage } from "./redux/actions";

import AdminRoute from './components/Routing/AdminRoute'
import AdminBoard from './components/AdminBoard'

import UserRoute from './components/Routing/UserRoute'
import UserBoard from './components/userBoard/UserBoard'

import NavBar from './components/nabBar/NavBar'
import Signin from "./components/SigninForm";
import Signup from "./components/SignupForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SingleBook from './components/SingleBook'
import Cart from './components/Cart'

const App: React.FC = () => {
  const history = createBrowserHistory();
  const dispatch = useDispatch()
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch, history]);
   
  //const order = useSelector((state: { order: {cart:[]} }) => state.order)
  return <div >
    <NavBar />
    <div style={{padding: '5px 10% 0 10% ' }} >
      <Switch>
        <AdminRoute
          path='/admin'
          component={AdminBoard}
        />
        <UserRoute
          path='/user'
          component={UserBoard}
        />
        <Route  path="/signup"> <Signup history ={history}/> </Route>
        <Route  path="/signin">  <Signin history = {history}/> </Route>
        {/* <Route  path="/user">  <UserBoard/>  </Route>  */}
        <Route  path="/books/:id">  <SingleBook/> </Route> 
        <Route  path="/profile">  <Profile/> </Route> 
        <Route  path="/cart/:id" > <SingleBook/>  </Route>
        <Route  path="/cart" >  <Cart/> </Route>
        <Route  path="/">  <Home /> </Route> 
      </Switch>
    </div>
  </div>
};
export default App;
