import React from 'react';
import styled from 'styled-components';

interface Props {
  closePopup: () => void;
}

const PopupContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;
  background-color: rgba(153, 188, 133, 0.9);
  color: var(--text-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.2rem;
`;

const TestLoginPopup: React.FC<Props> = ({ closePopup }) => {
  return (
    <PopupContainer>
      <CloseButton onClick={closePopup}>✖</CloseButton>
      <h4>Test Login Details</h4>
      <p>user: user@gmail.com, password: user</p>
      <p>admin: admin@gmail.com, password: admin</p>
    </PopupContainer>
  );
};

export default TestLoginPopup;
