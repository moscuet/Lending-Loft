import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/authService";

type Props = {};

type State = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    address: string
    password: string
    confirmPassword: string     
    acceptTerms: boolean
    successful: boolean,
    message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      successful: false,
      message: ''
    };
  }

  validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      useremail: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      phoneNumber:Yup.string()
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
    });
  }

  handleRegister(formValue: { firstName: string, lastName: string, useremail: string, phoneNumber:string, password: string , address: string}) {
    const { firstName, lastName, useremail, phoneNumber, address, password } = formValue;
    console.log('form data', formValue, 'firstname',firstName, 'lastName',lastName, 'email', useremail, 'phoneNumber',phoneNumber,'address', address, 'pass',password)
    console.log("hello from frontend form register")
    this.setState({
      message: "",
      successful: false
    });

    console.log(formValue)

    AuthService.register(
      firstName, 
      lastName, 
      useremail, 
      phoneNumber, 
      address, 
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      firstName: '',
      lastName: '',
      useremail: '',
      phoneNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
    };

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
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="firstName">FirstName</label>
                    <Field name="firstName" type="text" className="form-control" />
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
                    <Field name="useremail" type="text" className="form-control" />
                    <ErrorMessage
                      name="useremail"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber"> PhoneNumber</label>
                    <Field name="phoneNumber" type="text" className="form-control" />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address"> Address </label>
                    <Field name="address" type="address" className="form-control" />
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
                    <button  type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}