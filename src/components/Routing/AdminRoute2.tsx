import React from 'react';
import { Route } from 'react-router';
import { createBrowserHistory } from 'history';
const AdminRoute = ({component,  ...rest}: any) => {

  const history = createBrowserHistory ()
  
  let isAuthenticated = true
  const routeComponent = (props: any) => (
    isAuthenticated
      ? React.createElement(component, props)
      : history.push('/login')
  );
  return <Route {...rest} render={routeComponent}/>;
}
export default AdminRoute