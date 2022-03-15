import React, { useState } from 'react';
import { Formik,  Form} from 'formik'

import './checkout.css'
import UserDetails from "./UserDetails";
import UserAddress from "./UserAddress";
import Confirmation from "./Confirmation";
import SuccedCheckout from './SuccedCheckout'

import { Product } from '../../types';

const MultiStepForm =(props:{inCart:Product[]})=> {
  console.log('incart from multistepform',props.inCart[0])
  const [data, setData] = useState({
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip:'',
  })

  const nextStep = () => {
    const { step } = data
    setData({
      ...data,
      step : step + 1
    })
  }


  const prevStep= () => {
    const { step } = data
    setData({
      ...data,
      step : step - 1
    })
  }

  const handleSubmit = (formValue:{firstName:string, lastName:string, email:string, address:string, city:string, state:string, zip:string }) =>{
    const {firstName, lastName, email, address,city, state, zip} = formValue
    const { step } = data
    setData({
      step : step + 1,
      firstName,
      lastName,
      email, 
      address,
      city, 
      state, 
      zip     
    })
  }

  const confirmCheckout = () =>{
    const { step } = data
    setData({
      ...data,
      step : step + 1
    })
  }
  const { step, firstName, lastName, email, address, city, state, zip } = data;
  const inputValues = { firstName, lastName, email, address, city, state, zip };
 
  return <div className="col-md-12 checkout-wrapper">
    <div className="card card-container">
      <Formik
        initialValues={inputValues}
        //</div>validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          { (()=>{
            switch(step) {
            case 1:
              return <UserDetails
                nextStep={nextStep}
                inputValues={inputValues}
              />
            case 2:
              return <UserAddress
                prevStep={prevStep}
                inputValues={inputValues}
              />
            case 3:
              return <Confirmation
                nextStep={confirmCheckout}
                prevStep={prevStep}
                inputValues={inputValues}
              />
            case 4:
              return <SuccedCheckout
                inCart = {props.inCart}
              />
            }
          })()}
        </Form>
      </Formik>
    </div>
  </div>
      
    
}

export default MultiStepForm;