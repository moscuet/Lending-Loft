import React, {ReactElement} from 'react'
//import { createBrowserHistory } from 'history';
import { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import authService from "../../services/authService";
import EventBus from "../../common/EventBus";
import {TCustomer }from '../../types';


import 'bootstrap/dist/css/bootstrap.min.css';

import './navBar.css'

export default function NavBar():ReactElement {

  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<TCustomer | undefined>(undefined);

  useEffect(() => {
    const user = authService.getCurrentCustomer();

    if (user) {
      setCurrentUser({...user});
      setShowAdminBoard(user.roles.includes("admin"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {

    authService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };


  return (
    <Navbar bg="dark" variant="dark"
      sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand>
        {/* <img src={logo} width="40px" height="40px" />{' '} */}
          Logo
      </Navbar.Brand>

      <Navbar.Toggle className="coloring" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#about">About Us</Nav.Link>
          <Nav.Link href="#contact">Contact Us</Nav.Link>
          <NavDropdown title="Book catagories">
            <NavDropdown.Item href="#catagory/action">Action and adventure</NavDropdown.Item>
            <NavDropdown.Item href="#catagory/comedy">Comedy</NavDropdown.Item>
            <NavDropdown.Item href="#catagory/crime">Crime and mystery </NavDropdown.Item>
            <NavDropdown.Item href="#catagory/fiction">Fiction</NavDropdown.Item>
            <NavDropdown.Item href="#catagory/romance">Romance</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#products/promo">Others</NavDropdown.Item>
          </NavDropdown>
          {showAdminBoard && (
            <Nav.Link href="/admin">Admin</Nav.Link>
          )}
          {currentUser ? (
            <>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/" onClick = {logOut}>logout</Nav.Link>
            </>
          ): 
            (<>
              <Nav.Link href="/signin">signin</Nav.Link>
              <Nav.Link href="signup">Sign Up</Nav.Link>
            </>)
          }
          <Nav.Link href="#cart">Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
