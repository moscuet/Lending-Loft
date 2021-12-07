import React from "react";
import { useState, useEffect } from "react";
import { Routes as Switch, Route, Link } from "react-router-dom";
//import {useHistory} from 'react-router-dom'
import { createBrowserHistory } from 'history';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import  AuthService from "./services/authService";
import {TCustomer }from './types';
import Signin from "./components/SigninForm";
import Signup from "./components/SignupForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserBoard from "./components/UserBoard";
import AdminBoard from "./components/AdminBoard";
import EventBus from "./common/EventBus";


const App: React.FC = () => {
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<TCustomer | undefined>(undefined);


  const history = createBrowserHistory();



  useEffect(() => {
    const user = AuthService.getCurrentCustomer();

    if (user) {
      setCurrentUser(user);
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.firstName}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/signin" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/signin"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route  path="/" element={<Home />} />
          <Route  path="/signup" element={<Signup history ={history} />} />
          <Route  path="/signin" element={<Signin history = {history}  />} />
          <Route  path="/" element={<UserBoard/>} />
          <Route  path="/" element={<AdminBoard/>} />
          <Route  path="/profile" element={<Profile/>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
