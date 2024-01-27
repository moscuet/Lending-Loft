import React, { useState } from 'react'
import UserBorrowList from './UserBorrowList'
import Setting from './Setting'
import styled from 'styled-components'
import { toast } from 'react-toastify'

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






const UserBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('borrows');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    toast.success("User Settings Updated Succesfully!");
  };

  return (
    <div className="userboard-container">
      <div><h2 style={{ textAlign: 'center' }}>User Board</h2></div>
      <div className="userboard-container_nav">
        <TabButton
          onClick={() => setActiveTab('setting')}
          className={activeTab === 'setting' ? 'active-tab' : ''}
        >
          Setting
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('borrows')}
          className={activeTab === 'borrows' ? 'active-tab' : ''}
        >
          Borrowed
        </TabButton>
      </div>
      <div>
        {activeTab === 'setting' && <Setting onSaved={() => handleTabChange('borrows')} />}
        {activeTab === 'borrows' && <UserBorrowList />}
      </div>
    </div>
  );
}


export default UserBoard
