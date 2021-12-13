import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

const LoadingToRedirect = () => {
  const history = createBrowserHistory();
  const [count, setCount] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    
    if(count === 0) {
      history.push('/signin');
      window.location.reload();
    }
     
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className='container p-5 text-center'>
      <p>
        You are not authorized to this route. Redirecting you in {count} seconds{' '}
      </p>
    </div>
  );
};

export default LoadingToRedirect;