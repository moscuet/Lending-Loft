import React, { useState, ReactElement } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { AppState } from '../types'
import { Redirect } from "react-router-dom";

import AuthService from '../services/authService'

interface RouterProps {
  history: {
    push(url: string): void
  }
}

const Signup = (props: RouterProps): ReactElement => {
  const { isLoggedIn } = useSelector((state: AppState) => state.auth)
  //const message = useSelector((state: AppState) => state.message)

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    message: '',
    acceptTerms: false,
    successful: false,
  })

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      useremail: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      phoneNumber: Yup.string()
        .matches(new RegExp('[0-9]{10}'))
        .required('phone number is required'),
      address: Yup.string()
        .required('address is required')
        .max(255, 'Password must not exceed 255 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    })
  }

  function handleRegister(formValue: {
    firstName: string
    lastName: string
    useremail: string
    phoneNumber: string
    password: string
    address: string
  }) {
    const { firstName, lastName, useremail, phoneNumber, address, password } =
      formValue
    
    console.log('hello from frontend form register')
    setState({ ...state, successful: false })

    AuthService.register(
      firstName,
      lastName,
      useremail,
      phoneNumber,
      address,
      password
    ).then(
      (response) => {
        setState({ ...state, successful: true })
        props.history.push('/signin')
        window.location.reload()
      },
      (error) => {
        setState({
          ...state,
          successful: false,
          message: `Email ${useremail} already registered`,
        })
      }
    )
  }


  
  const initialValues = {
    firstName: '',
    lastName: '',
    useremail: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  }
  if (isLoggedIn) {
    ;<Redirect  to="/profile" />
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          
          <Form>
            {!state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">FirstName</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">LastName</label>
                  <Field name="lastName" type="text" className="form-control" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="useremail">useremail</label>
                  <Field
                    name="useremail"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="useremail"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber"> PhoneNumber</label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address"> Address </label>
                  <Field
                    name="address"
                    type="address"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Password </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword"> Confirm Password </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
            )}

            {state.message && (
              <div className="form-group">
                <div
                  className={
                    state.successful
                      ? 'alert alert-success'
                      : 'alert alert-danger'
                  }
                  role="alert"
                >
                  {state.message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Signup
