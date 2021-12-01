import React, {ReactElement} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import './navBar.css'

export default function NavBar():ReactElement {
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
          <Nav.Link href="#blog">Books</Nav.Link>
          <Nav.Link href="#about-us">Authors</Nav.Link>
          <Nav.Link href="#about">About Us</Nav.Link>
          <Nav.Link href="#contact">Contact Us</Nav.Link>
          <NavDropdown title="Catagories">
            <NavDropdown.Item href="#catagory/action">Action and adventure</NavDropdown.Item>
            <NavDropdown.Item href="#catagory/comedy">Comedy</NavDropdown.Item>
            <NavDropdown.Item href="#catagory/crime">Crime and mystery </NavDropdown.Item>
            <NavDropdown.Item href="#catagory/fiction">Fiction</NavDropdown.Item>
            <NavDropdown.Item href="#catagory/romance">Romance</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#products/promo">Others</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#signup">Sign Up</Nav.Link>
          <Nav.Link href="#signin">sign In</Nav.Link>
          <Nav.Link href="#cart">Cart</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
