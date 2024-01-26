import React, { useState, ReactElement } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { AppState } from '../types'
import { Navigate } from "react-router-dom";
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import AuthService from '../services/authService'
import { toast } from 'react-toastify'

interface RouterProps {
  history: {
    push(url: string): void
  }
}

interface FormValues {
  firstName: string;
  lastName: string;
  useremail: string;
  phoneNumber: string;
  password: string;
  address: string;
}


export const CONTAINER = styled.div`
  background: var(--form-bg-color);
  color: var(--text-color);
  border-radius: 3px;
  height: auto;
  width: 90%;
  margin: 2rem auto;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  @media(min-width: 786px) {
    width: 60%;
  }
  h2 {
    text-align: center;
    color: var(--form-title-text-color);
    padding-top: .5em;
  }
  .form-group label {
    color: var(--text-color);
    margin-bottom: 0.5em;
  }
  .alert.alert-danger {
    color: var(--alert-color);
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0; 
  }
`;


export const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 1em;
  padding-bottom: 1em;

  .form-control {
    background-color: var(--placeholder-bg-color);
    color: var(--text-color);
    border: 1px solid #ced4da;

    ::placeholder {
      color: var(--placeholder-color);
      opacity: 1;
    }

    &:focus {
      outline: none;  
      box-shadow: none
    }

    :-ms-input-placeholder { 
      color: var(--placeholder-color);
    }

    ::-ms-input-placeholder {
      color: var(--placeholder-color);
    }
  }

  .form-group {
    margin-bottom: 1em; 

    &:last-child {
      margin-bottom: 0;
    }
  }

  .alert.alert-danger {
    color: var(--alert-color);
    background-color: transparent;
    border: none;
    margin: 0;
    margin-top: 0.5em;
    padding: 0.0em;
    font-size: 0.85em;
  }
`;


export const BUTTON = styled(Button)`
  background: var(--button-primary-bg-color);
  color: var(--button-primary-text-color);
  border: none;
  &:hover {
    background: var(--link-hover-color);
  }
  &.btn-primary:active {
    background: var(--accent-color); 
  }
  margin-right: 1em;
`;





const FormRow = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 768px) {
    flex-direction: row;

    .form-group {
      flex: 1;
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
`;

const Signup = (props: RouterProps): ReactElement => {
  const { isLoggedIn } = useSelector((state: AppState) => state.auth)

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
  const mobileRegExp = /^\+?\d{7,13}$/

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      useremail: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      phoneNumber: Yup.string()
        .matches(mobileRegExp, "Valid phone number (7-13 digits, start with optional '+').")
        .required('Phone number is required'),
      address: Yup.string()
        .required('Address is required')
        .max(255, 'Password must not exceed 255 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least  characters')
        .max(40, 'Password must not exceed 40 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    })
  }

  function handleRegister(formValue: FormValues, setSubmitting: (isSubmitting: boolean) => void) {
    const { firstName, lastName, useremail, phoneNumber, address, password } = formValue;
    setState({ ...state, successful: false });

    AuthService.register(firstName, lastName, useremail, phoneNumber, address, password)
      .then(response => {
        toast.success("Your registration is successful! We're excited to have you on board.");
        props.history.push('/signin');
        window.location.reload();
      })
      .catch(error => {
        toast.error("Failed to register: " + error.message);
        setState({ ...state, successful: false, message: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
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
    ; <Navigate to="/profile" />
  }

  return (
    <CONTAINER >
      {!state.successful && <h2>Sign Up</h2>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(formValue, { setSubmitting }) => {
          handleRegister(formValue, setSubmitting);
        }}      >

        {({ isSubmitting }) => (
          <MYFORM>
            {!state.successful && (
              <div>
                <FormRow>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
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
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" className="form-control" />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                </FormRow>


                <FormRow>
                  <div className="form-group">
                    <label htmlFor="useremail">User Email</label>
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
                    <label htmlFor="phoneNumber"> Mobile Number</label>
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
                </FormRow>


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

                  <BUTTON type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Sign Up</span>
                  </BUTTON>
                </div>
              </div>
            )}
          </MYFORM>
        )}

      </Formik>
    </CONTAINER >
  )
}

export default Signup
