import React, { useState, ReactElement } from 'react'
import { Formik, Field, ErrorMessage, FormikState } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { AppState } from '../types'
import { Navigate } from "react-router-dom";

import AuthService from '../services/authService'
import { toast } from 'react-toastify'
import Loader from 'react-ts-loaders'
import { BUTTON, CONTAINER, FormRow, MYFORM ,LoaderContainer} from './ui/StyledComponenet'

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
  address: string;
  password: string;
  confirmPassword: string;
}


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

  function handleRegister(
    formValue: FormValues,
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: (nextState?: Partial<FormikState<FormValues>>) => void
  ) {
    const { firstName, lastName, useremail, phoneNumber, address, password } = formValue;
    setState({ ...state, successful: false });

    AuthService.register(firstName, lastName, useremail, phoneNumber, address, password)
      .then(response => {
        setState({ ...state, successful: true });
        toast.success("Your registration is successful! We're excited to have you on board.");
        resetForm();
        setTimeout(() => {
          props.history.push('/signin');
          window.location.reload();
        }, 2000);
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
    <>
      {
        state.successful && <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      }
      {!state.successful && <CONTAINER >
        {<h2>Sign Up</h2>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(formValue, { setSubmitting, resetForm }) => {
            handleRegister(formValue, setSubmitting, resetForm);
          }}      >

          {({ isSubmitting }) => (
            <MYFORM>
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
                    <span style={{ marginLeft: '4px' }}>Sign Up</span>
                  </BUTTON>
                </div>
              </div>
            </MYFORM>
          )}

        </Formik>
      </CONTAINER >}
    </>
  )
}

export default Signup
