import React, { ReactElement } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik'
import { Button, Container } from 'react-bootstrap'
import { FormRow } from '../ui/StyledComponenet';
import { FormValue } from './MultiStepsCheckout';
import { useNavigate } from 'react-router-dom';
import '../../styles/checkoutUserDetails.css'

interface ToggleProps {
  nextStep: () => void
  inputValues: FormValue
}


const UserDetails = (props: ToggleProps): ReactElement => {
  const navigate = useNavigate();
  const { isValid, dirty } = useFormikContext<FormValue>();

  return (
    <Container className='checkout__user-details'>
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
      <div className='button-container'>
        <Button onClick={() => navigate('/cart')} variant="secondary">
          <img src={'/resources/arrowLeft.svg'} alt="Left Arrow" />
          Back
        </Button>
        <Button variant="primary" onClick={props.nextStep} disabled={!(isValid && dirty)}>
          Next
          <img src={'/resources/arrowRight.svg'} alt="Right Arrow" />
        </Button>
      </div>

    </Container>
  );
}

export default UserDetails;