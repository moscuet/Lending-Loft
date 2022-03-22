import React, { useState,  ReactElement } from "react";
import {  useSelector, useDispatch } from "react-redux";
import {AppState}  from '../types'
import { NavLink, Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {login} from '../redux/actions/auth'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';


interface RouterProps {
    history: {
        push(url: string): void;
    };
}


const CONTAINER = styled.div`
  background: #FEFEFE;
  border-radius: 3px;
  height: auto;
  width: 90%;
  margin: 2rem auto;
  padding: 20px;
  -webkit-box-shadow: 2px  2px  2px  2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 2px  2px  2px  2px rgba(0, 0, 0, 0.3);
  box-shadow: 2px  2px  2px  2px rgba(0, 0, 0, 0.3);
  @media(min-width: 786px) {
    width: 60%;
  }
  h2 {
    text-align:center;
    color: green;
    padding-top: .5em;
  }
  .form-group {
    margin-bottom: 2.5em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;
`;

const BUTTON = styled(Button)`
  background: #1863AB;
  margin:10px;
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  &:hover {
    background: #1D3461;
  }
`;

const  Signin = (props:RouterProps) : ReactElement => {

  const { isLoggedIn } = useSelector((state:AppState) => state.auth);
  //const message = useSelector((state:AppState) => state.message);

  const [userState, setUserState] = useState({
    useremail: "",
    password: "",
    loading: false,
    isLoggedIn:false,
    message:''
  })


  function validationSchema() {
    return Yup.object().shape({
      useremail: Yup.string()
        .required("This field is required!")
        .email('Email is invalid'),
      password: Yup.string().required("This field is required!"),
    });
  }

  const dispatch = useDispatch()

  const  handleSignin = async(formValue: { useremail: string; password: string }) => {
    const { useremail, password } = formValue;
    setUserState({ ...userState,
      loading: true
    });
    
    try {
      await dispatch(login(useremail, password ))
      setUserState({ ...userState,
        loading: false,
        isLoggedIn:true,
      });
      props.history.push("/");
      window.location.reload();
 
    } catch(error){
      console.log('error',error)
      setUserState({...userState,
        loading: false,
        message: 'invalid email and password'
      });
    }
  }

  const initialValues = {
    useremail: "",
    password: "",
  };

  if (isLoggedIn) {
    <Navigate to="/login" />

  }
  return (
    <CONTAINER >
      <h2>Signin</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignin}
      >
        <MYFORM>
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
            <BUTTON type="submit" className="btn btn-primary btn-block" disabled={userState.loading}>
              {userState.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </BUTTON>
              Not registered yet? <NavLink to={`/signup`}>Register</NavLink>

          </div>

          {userState.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {userState.message}
              </div>
            </div>
          )}
        </MYFORM>
      </Formik>
    </CONTAINER >
  )
}

export default Signin