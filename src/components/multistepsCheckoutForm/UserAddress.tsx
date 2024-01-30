import React, { ReactElement } from 'react'
import { Field, ErrorMessage } from 'formik'
import { Button, Container } from 'react-bootstrap'

interface ToggleProps {
  prevStep: () => void
  inputValues: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zip: string
  }
}

const AddressDetails = (props: ToggleProps): ReactElement => {
  console.log('from addres@@@@@@@@@@@@', props.inputValues)
  return (
    <Container>
      <h2> Delivery Address</h2>
      <div className="form-group">
        <label htmlFor="address">address</label>
        <Field name="address" type="text" className="form-control" />
        <ErrorMessage
          name="address"
          component="div"
          className="alert alert-danger"
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">city</label>
        <Field name="city" type="text" className="form-control" />
        <ErrorMessage
          name="city"
          component="div"
          className="alert alert-danger"
        />
      </div>

      <div className="form-group">
        <label htmlFor="zip">zip</label>
        <Field name="zip" type="text" className="form-control" />
        <ErrorMessage
          name="zip"
          component="div"
          className="alert alert-danger"
        />
      </div>
      <Button variant="secondary" onClick={props.prevStep}>
        Back
      </Button>{' '}
      <Button variant="primary" type="submit">
        Next
      </Button>
    </Container>
  )
}

export default AddressDetails
