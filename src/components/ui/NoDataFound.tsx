import React, { ReactElement } from 'react'

const NoDataFound = ({ type }: { type: string }): ReactElement => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px',
      fontWeight: 'bold',
      backgroundColor: 'var(--error-message-bg-color)',
      color: 'var(--error-message-text-color)'
    }}>
      {`No ${type} found, please add new ${type} `}
    </div>
  )
}
export default NoDataFound





