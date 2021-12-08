import React, {  useEffect } from "react";
//import { useState, useEffect } from "react";
import { Routes as Switch, Route } from "react-router-dom";
//import {useHistory} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from './components/nabBar/NavBar'
import Signin from "./components/SigninForm";
import Signup from "./components/SignupForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserBoard from "./components/UserBoard";
import AdminBoard from "./components/AdminBoard";
import authService from "./services/authService";
import { clearMessage } from "./redux/actions";

const user = authService.getCurrentCustomer();
console.log('user', user)
const App: React.FC = () => {
  const history = createBrowserHistory();
  const dispatch = useDispatch()
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch, history]);
   
  const order = useSelector((state: { order: {cart:[]} }) => state.order)
  console.log('order',order)
  return <div>
    <NavBar />
    <div className="container mt-3">
      <Switch>
        <Route  path="/" element={<Home />} />
        <Route  path="/signup" element={<Signup history ={history} />} />
        <Route  path="/signin" element={<Signin history = {history}  />} />
        <Route  path="user" element={<UserBoard/>} />
        <Route  path="/admin" element={<AdminBoard/>} />
        <Route  path="/profile" element={<Profile/>} />
      </Switch>
    </div>
  </div>
  
};

export default App;
