import React, {ReactElement } from 'react';
import { Button, Container } from 'react-bootstrap';


interface CheckoutProps {
    nextStep: () => void
    prevStep: () => void
    inputValues:{firstName:string, lastName:string, email:string, address:string, city:string,  zip:string }
}

const Confirmation = (props: CheckoutProps):ReactElement =>{

  const {inputValues: {  lastName, email, address, city, zip }} = props;


  return(
    <Container>
      <h1>Confirm your Details</h1>
      <p>Confirm if the following details are correct.</p>
      <p>First Name: {props.inputValues.firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Adress: {address}</p>
      <p>City: {city}</p>
      <p>Zip: {zip}</p>
      <Button variant="secondary" onClick={props.prevStep}>Back</Button>{' '}
      <Button variant="primary" onClick={props.nextStep} >Confirm</Button>
    </Container>
  )
}

export default Confirmation;