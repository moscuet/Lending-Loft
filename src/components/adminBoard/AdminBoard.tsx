
import React, { useState } from 'react'
import styled from 'styled-components'
// import { toast } from 'react-toastify'
import AddAuthor from './AddAuthor'
import Users from './Users'
import Books from './Books'
import Authors from './Authors'
import AddBook from './AddBook'
import AdminBorrowList from './AdminBorrowList'
import './adminboard.css'


const TabButton = styled.button`
  color: var(--navbar-text-color);
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  margin-right: 16px; 

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px; 
    background-color: var(--link-hover-color); 
    transition: width 0.3s ease; 
  }

  &:hover::before,
  &.active-tab::before {
    width: 100%;
  }
`;



const AdminBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  // const handleTabChange = (tab: string) => {
  //   setActiveTab(tab);
  //   toast.success("User Settings Updated Succesfully!");
  // };



  return (
    <div className="adminboard-container">
      <div><h2 style={{ textAlign: 'center' }}>Admin Board</h2></div>
      <div className="adminboard-container_nav">
        <TabButton
          onClick={() => setActiveTab('users')}
          className={activeTab === 'users' ? 'active-tab' : ''}
        >
          Users
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('borrows')}
          className={activeTab === 'borrows' ? 'active-tab' : ''}
        >
          Borrows
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('books')}
          className={activeTab === 'books' ? 'active-tab' : ''}
        >
          Books
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('authors')}
          className={activeTab === 'authors' ? 'active-tab' : ''}
        >
          Authors
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('addbook')}
          className={activeTab === 'addbook' ? 'active-tab' : ''}
        >
          Add Book
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('addauthor')}
          className={activeTab === 'addauthor' ? 'active-tab' : ''}
        >
          Add Author
        </TabButton>
      </div>
      <div>
        {activeTab === 'users' && <Users />}
        {activeTab === 'borrows' && <AdminBorrowList />}
        {activeTab === 'books' && <Books />}
        {activeTab === 'authors' && <Authors />}
        {activeTab === 'addbook' && <AddBook />}
        {activeTab === 'addauthor' && <AddAuthor />}
      </div>
    </div>
  );


}
export default AdminBoard

