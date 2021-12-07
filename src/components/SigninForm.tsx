import React, { useState,  ReactElement } from "react";
//import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/authService";

interface RouterProps {
    history: {
        push(url: string): void;
    };
   
}

// type State = {
//   useremail: string,
//   password: string,
//   loading: boolean,
//   message: string
// };
// type propstype =  State & RouterProps

const  Signin = (props:RouterProps) : ReactElement => {

  const [state, setState] = useState({
    useremail: "",
    password: "",
    loading: false,
    message: ""
  })
   

  function validationSchema() {
    return Yup.object().shape({
      useremail: Yup.string()
        .required("This field is required!")
        .email('Email is invalid'),
      password: Yup.string().required("This field is required!"),
    });
  }

  function handleLogin(formValue: { useremail: string; password: string }) {
    const { useremail, password } = formValue;
    console.log( 'from login form useremail and pass',useremail, password )
    setState({ ...state,
      message: "",
      loading: true
    });


    AuthService.login(useremail, password).then(
      () => {
        props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setState({...state,
          loading: false,
          message: resMessage
        });
      }
    );
  }
  
  
  const { loading, message } = state;

  const initialValues = {
    useremail: "",
    password: "",
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
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
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
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Signin