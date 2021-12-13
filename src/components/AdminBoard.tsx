import React from 'react'
//import {useParams } from "react-router-dom";
//import { createBrowserHistory } from 'history';
//import { Switch, Route } from 'react-router';

//import { createBrowserHistory } from 'history';
import { useState, useEffect } from "react";
import { Nav, Navbar} from 'react-bootstrap'

import userService from "../services/userService";
import EventBus from "../common/EventBus";
//import AddBook from './AddBook';
//import Cart from './Cart';
//import AddBook from './AddBook';
import { useLocation } from 'react-router-dom'

const BoardUser: React.FC = () => {
  

  let { pathname} = useLocation()


  const [content, setContent] = useState<string>("");
  console.log(content)
  useEffect(() => {
    userService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);


  return (
    <div>
      <Navbar bg="white" 
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href=':userId'>users account</Nav.Link>
            <Nav.Link href={`${pathname}/addbook`}>Add Book</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
    </div>
  );
};

export default BoardUser;