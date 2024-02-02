import React from 'react'
import styled from 'styled-components'
import { CANCELBUTTON } from './StyledComponenet'
import '../../styles/adminboard.css'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Popup = styled.div`
  background-color: var(--card-bg-color);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 1001;
  width: 420px;
  max-width: 80%;
  height: 250px;
  max-height: 50%;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Message = styled.p`
margin: 40px 0 20px 0;
text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
    gap: 10px;
  margin-top: auto;
  margin-bottom: 40px;
`

interface ConfirmPopupProps {
  message: string
  onCancel: () => void
  onDelete: () => void
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  message,
  onCancel,
  onDelete,
}) => {
  return (
    <Backdrop>
      <Popup>
        <Message>{message}</Message>
        <ButtonContainer>
          <div>
            <CANCELBUTTON type="button" onClick={onCancel}>
              <span>Cancel</span>
            </CANCELBUTTON>
          </div>
          <div>
            <button className="deleteButtonTwo" onClick={onDelete}>
              Delete
            </button>
          </div>
        </ButtonContainer>
      </Popup>
    </Backdrop>
  )
}

export default ConfirmPopup
