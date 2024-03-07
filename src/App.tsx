import { Fragment} from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

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
import Footer from './components/Footer'
import MultiStepsCheckout from './components/multistepsCheckoutForm/MultiStepsCheckout'

const App = () => {
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
                  <UserBoard>
                    <Route path="/user/checkout" element={<MultiStepsCheckout />} />
                  </UserBoard>
                </UserRoute>
              }
            />
            <Route path='/user/checkout' element={<UserRoute><MultiStepsCheckout /></UserRoute>} /> {/* Protected within UserRoute */}

            <Route path='/contact-us' element={<ContactForm />} />
            <Route path='/books/catagory/*' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/books/:id' element={<SingleBook />} />
            <Route path='/cart/:id' element={<SingleBook />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Home />} />
          </Switch>

        </div>

      </div>
      <Footer />
    </Fragment>
  )
}
export default App
