import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { useSelector } from 'react-redux';


import {AppState} from '../../types'
import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({ component, ...rest }:any) => {
  const user = useSelector((state:AppState) => state.auth.user);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      user.roles === 'admin' ? setOk(true) : setOk(false);
    }
  }, [user]);
  const routeComponent = (props: any) => (
    ok
      ? React.createElement(component, props)
      : <LoadingToRedirect />
  );
  return <Route {...rest} render={routeComponent}/>;
  
};

export default AdminRoute;