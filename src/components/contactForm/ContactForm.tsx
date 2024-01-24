import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from "formik";
import { FormikHelpers } from 'formik';

import contactService from '../../services/contactService'
import { BUTTON, CONTAINER, MYFORM } from '../SignupForm';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .required("*Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "*Phone number is not valid")
    .required("*Phone number required"),
  message: Yup.string()
    .min(20, "*Message must have at least 20 characters")
    .max(1000, "*Message can't be longer than 1000 characters")
    .required("*Message is required"),
});
const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  interface FormValues {
    name: string;
    email: string;
    phone: string;
    message: string;
  }

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);
    setFormSubmitted(false);
    setSubmitError('');

    contactService.sendMessage(values)
      .then(response => {
        // Handle successful response
        setFormSubmitted(true);
        resetForm();
      })
      .catch(error => {
        // Handle error response
        setSubmitError('Failed to send message. Please try again.');
        console.error('Error during form submission', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };



  return (
    <CONTAINER>
      <h2 >SAY HELLO!</h2>
      <Formik
        initialValues={{ name: "", email: "", phone: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <MYFORM onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="alert alert-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage name="email" component="div" className="alert alert-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile</label>
              <Field name="phone" type="text" className="form-control" />
              <ErrorMessage name="phone" component="div" className="alert alert-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <Field name="message" as="textarea" rows={5} className="form-control" />
              <ErrorMessage name="message" component="div" className="alert alert-danger" />
            </div>

            <div className="form-group">
              <BUTTON type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Submit</span>
              </BUTTON>
              {submitError && (
                <div className="alert alert-danger" role="alert">
                  {submitError}
                </div>
              )}
              {formSubmitted && (
                <div style={{ color: 'green' }}>MESSAGE SENT</div>
              )}
            </div>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
}

export default ContactForm;