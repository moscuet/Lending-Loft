import React from 'react'
// import { Switch, Route } from 'react-router-dom' // old
import { Routes as Switch, Route } from 'react-router-dom' // updated to latest
//https://reactrouter.com/docs/en/v6/upgrading/v5
//https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom

import Home from './pages/Home'
import Product from './components/Product'

const Routes = () => (
  <Switch>
    <Route  path="/" element={<Home />} />
    <Route  path="/products/:id" element={<Product />} />
  </Switch>
)

export default Routes
