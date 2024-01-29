import { ReactElement } from "react"

const NotFound = ({ message }: { message: string }): ReactElement => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px',
      fontWeight: 'bold',
      backgroundColor: 'var(--error-message-bg-color)',
      color: 'var(--error-message-text-color)'
    }}>
      {`Not Found ${message ? ': ' + message : ''}`}
    </div>
  )
}
export default NotFound