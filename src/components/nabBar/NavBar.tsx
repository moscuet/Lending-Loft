import React, {ReactElement} from 'react'
import { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { createBrowserHistory } from 'history';

import authService from "../../services/authService";
import EventBus from "../../common/EventBus";

import 'bootstrap/dist/css/bootstrap.min.css';

import './navBar.css'

export default function NavBar():ReactElement {
  const history = createBrowserHistory()

  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [showUserBoard, setShowUserBoard] = useState<boolean>(false);

  const logOut = () => {
    authService.logout();
    setShowAdminBoard(false);
    setShowUserBoard(false);
    history.push('/')
    window.location.reload();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const user = authService.getCurrentCustomer();

    if (user) {
      setShowAdminBoard(user.roles.includes("admin"));
      setShowUserBoard(user.roles.includes("user"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, );




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
          <Nav.Link href="/contact-us">Contact Us</Nav.Link>
          <NavDropdown title="Book catagories">
            <NavDropdown.Item href="/books/catagory/action">Action and adventure</NavDropdown.Item>
            <NavDropdown.Item href="/books/catagory/comedy">Comedy</NavDropdown.Item>
            <NavDropdown.Item href="/books/catagory/drama">Drama</NavDropdown.Item>
            <NavDropdown.Item href="/books/catagory/crime">Crime and mystery </NavDropdown.Item>
            <NavDropdown.Item href="/books/catagory/fiction">Fiction</NavDropdown.Item>
            <NavDropdown.Item href="/books/catagory/romance">Romance</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/books/catagory/promo">Others</NavDropdown.Item>
          </NavDropdown>
          {showAdminBoard && (
            <>
              <Nav.Link href="/admin">Admin</Nav.Link>
              <Nav.Link onClick={logOut}>logout</Nav.Link>
            </>
          )}
          {showUserBoard && (
            <>
              <Nav.Link href="/user">User</Nav.Link>
              <Nav.Link onClick = {logOut}>logout</Nav.Link>
            </>
          )
          }
          { !(showUserBoard || showAdminBoard ) &&
             (<>
               <Nav.Link href="/signin">signin</Nav.Link>
               <Nav.Link href="/signup">Sign Up</Nav.Link>
             </>)
          }
        </Nav>
      </Navbar.Collapse>
      <Nav.Link href="/cart">Cart</Nav.Link>
    </Navbar>
  )
}
