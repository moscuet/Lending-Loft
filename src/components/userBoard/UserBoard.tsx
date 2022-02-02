import React from 'react'
import { useState, useEffect } from "react";

import userService from "../../services/userService";
import EventBus from "../../common/EventBus";

import './userboard.css'
import BorrowList from './BorrowList'
import Setting from './Setting'

const AdminBoard: React.FC = () => {

  const [ content, setContent] = useState('')
  const [ showComponent, setShowComponent] = useState('borrow-list')

  console.log(content)

  useEffect(() => {
    userService.getCustomerBoard().then(
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

  const handleShowComponent= (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowComponent(event.currentTarget.name)
  }



  return (
    <div className='userboard-container'>
      <button className = {`${showComponent === 'borrow-list'? 'active': ''}`} name = 'borrow-list' onClick = {handleShowComponent }>Borrow List</button> <button className = {`${showComponent === 'setting'? 'active': ''}`} name = 'setting' onClick = {handleShowComponent}>Setting</button>
      { (showComponent === 'borrow-list') && (<BorrowList />)}
      { (showComponent === 'setting') && (<Setting />)}
    </div>
  );
};

export default AdminBoard;