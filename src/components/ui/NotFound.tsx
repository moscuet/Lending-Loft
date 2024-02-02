
const NotFound = ({ message }: { message: string }): JSX.Element => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px',
      fontWeight: 'bold',
      backgroundColor: 'var(--error-message-bg-color)',
      color: 'var(--alert-color)'
    }}>
      {`Not Found ${message ? ': ' + message : ''}`}
    </div>
  )
}
export default NotFound