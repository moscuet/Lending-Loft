import React, { ReactElement } from 'react';
import { Field, ErrorMessage } from 'formik'
import { Button, Container } from 'react-bootstrap'
import { FormRow } from '../ui/StyledComponenet';

interface ToggleProps {
  nextStep: () => void
  inputValues: { firstName: string, lastName: string, email: string, phone: string; address: string, city: string, zip: string }
}


const UserDetails = (props: ToggleProps): ReactElement => {


  return (
    <Container>
      <h5>Your Details</h5>

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
      </FormRow>

      <FormRow>
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="phoner">Phone number</label>
          <Field
            name="phone"
            type="text"
            className="form-control"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="alert alert-danger"
          />
        </div>
      </FormRow>


      <h5>Delivery Address</h5>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <Field
          name="address"
          type="text"
          className="form-control"
        />
        <ErrorMessage
          name="address"
          component="div"
          className="alert alert-danger"
        />
      </div>


      <FormRow>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <Field
            name="city"
            type="text"
            className="form-control"
          />
          <ErrorMessage
            name="city"
            component="div"
            className="alert alert-danger"
          />
        </div>

        <div className="form-group">
          <label htmlFor="zip">Zip</label>
          <Field
            name="zip"
            type="text"
            className="form-control"
          />
          <ErrorMessage
            name="zip"
            component="div"
            className="alert alert-danger"
          />
        </div>

      </FormRow>
      <Button variant="secondary" >
        Back
      </Button>
      <Button variant="primary" onClick={props.nextStep}>
        Next
      </Button>
    </Container>
  );
}

export default UserDetails;