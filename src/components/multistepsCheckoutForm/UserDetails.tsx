import React , {ReactElement } from 'react';
import {  Field, ErrorMessage } from 'formik'
import { Button, Container } from 'react-bootstrap'

interface ToggleProps {
    nextStep: () => void
    inputValues:{firstName:string, lastName:string, email:string, address:string, city:string, state:string, zip:string }
}

const UserDetails =(props: ToggleProps):ReactElement =>{
  console.log(props)
  return (

    <Container>
      <h1>Your Details</h1>
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
        <Field
          name="lastName"
          type="text"
          className="form-control"
        />
        <ErrorMessage
          name="lastName"
          component="div"
          className="alert alert-danger"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">email</label>
        <Field
          name="email"
          type="text"
          className="form-control"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="alert alert-danger"
        />
      </div>
      <div className="form-group">
        <Button variant="primary" onClick={props.nextStep}>
                Next
        </Button>
      </div>
             
    </Container>

  )
}

export default UserDetails;