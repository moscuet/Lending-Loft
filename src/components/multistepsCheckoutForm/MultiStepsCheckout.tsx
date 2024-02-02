import React, { useState } from 'react';
import { Formik, Form } from 'formik'
import '../../styles/checkoutUserDetails.css'
import UserDetails from "./UserDetails";
import Confirmation from "./Confirmation";
import SuccedCheckout from './SuccedCheckout'
import * as Yup from 'yup';
import { AppState } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import borrowService from '../../services/borrowservice'
import { EmptyCart } from '../../redux/actions';
import { toast } from 'react-toastify';
import { ConfirmIcon, InfoIcon, SuccessIcon } from '../icon/Icon';

type StepperItemType = {
  label: string;
  icon: ({ fill }: { fill: string }) => JSX.Element;
};

const stepperItems: StepperItemType[] = [
  { label: 'Details', icon: InfoIcon },
  { label: 'Confirm', icon: ConfirmIcon },
  { label: 'Success', icon: SuccessIcon }
];



export type FormValue = { firstName: string, lastName: string, email: string, phone: string; address: string, city: string, zip: string }

const MultiStepsCheckout = () => {
  const dispatch = useDispatch()

  const cartItems = useSelector((state: AppState) => state.order.inCart)
  const user = useSelector((state: AppState) => state.auth.user)

  const [data, setData] = useState({
    step: 1,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.useremail || '',
    phone: (user.phoneNumber ? user.phoneNumber.toString() : ''),
    address: user.address || '',
    city: '',
    zip: '',
  })

  const nextStep = () => {
    const { step } = data
    setData({
      ...data,
      step: step + 1
    })
  }


  const prevStep = () => {
    const { step } = data
    setData({
      ...data,
      step: step - 1
    })
  }

  const handleSubmit = (formValue: FormValue) => {
    const { step } = data
    console.log('formValue', step, formValue)

    const user: { _id: string } = JSON.parse(localStorage.getItem("user") || '{}');
    if (user._id) {
      const borrowPromises = cartItems.map(prod => {
        const borrow = {
          bookId: [prod._id ? prod._id : ''],
          customerId: [user._id],
        };
        return borrowService.postBorrow(borrow);
      });
    
      Promise.all(borrowPromises)
        .then(results => {
          dispatch(EmptyCart());
          setData(prevState => ({ ...prevState, step: prevState.step + 1 }));
          toast.success('Your borrowing request was successful.');
        })
        .catch(error => {
          toast.error('Borrow request failed: ' + error.message);
        });
    }
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?\d{7,13}$/, "between 7 & 13 digits and may start with a '+'"),
    address: Yup.string()
      .required('Address is required'),
    city: Yup.string()
      .required('City is required'),
    zip: Yup.string()
      .required('Post code is required'),
  });

  const { step } = data
  return (
    <div className="col-md-12 checkout-wrapper">


      <div className="stepper-container">
        {stepperItems.map((item, index) => (
          <div key={index} className={`step ${step > index ? 'active' : ''}`}>
            <item.icon fill={step > index ? 'green' : ''} />
            <span className="step-label">{item.label}</span>
          </div>
        ))}
      </div>


      <div className= 'stepper-form-container'>
        <Formik
          initialValues={data}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {step === 1 && <UserDetails nextStep={nextStep} inputValues={values} />}
              {step === 2 && (
                <Confirmation
                  nextStep={nextStep}
                  prevStep={prevStep}
                  inputValues={values}
                />
              )}
              {step === 3 && <SuccedCheckout />}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default MultiStepsCheckout;