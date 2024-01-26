import React, { Fragment, useEffect } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { clearMessage } from './redux/actions'

import AdminBoard from './components/adminBoard/AdminBoard'
import UserBoard from './components/userBoard/UserBoard'
import NavBar from './components/nabBar/NavBar'
import Signin from './components/SigninForm'
import Signup from './components/SignupForm'
import Home from './pages/Home'
import SingleBook from './components/SingleBook'
import Cart from './components/Cart'
import AdminRoute from './components/Routing/AdminRoute'
import UserRoute from './components/Routing/UserRoute'
import ContactForm from './components/contactForm/ContactForm'
import ToastNotification from './components/ToastNotification'

const App: React.FC = () => {
  const history = createBrowserHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch, history])

  return (
    <Fragment>
      <NavBar />
      <ToastNotification />
      <div className='main-layout'>
        <div className="main-layout_wrapper">
          <Switch>
            <Route path='/admin/*'
              element={
                <AdminRoute >
                  <AdminBoard />
                </AdminRoute >
              }
            />

            <Route path='/user/*'
              element={
                <UserRoute >
                  <UserBoard />
                </UserRoute>
              }
            />
            <Route path='/contact-us' element={<ContactForm />} />
            <Route path='/books/catagory/*' element={<Home />} />
            <Route path='/signup' element={<Signup history={history} />} />
            <Route path='/signin' element={<Signin history={history} />} />
            <Route path='/books/:id' element={<SingleBook />} />
            <Route path='/cart/:id' element={<SingleBook />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Home />} />
          </Switch>

        </div>


      </div>

    </Fragment>
  )
}
export default App
