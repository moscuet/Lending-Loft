import React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik} from 'formik';
import * as Yup from 'yup';

const CONTAINER = styled.div`
  background: #FEFEFE;
  height: auto;
  width: 90%;
  margin: 5em auto;
  padding: 20px;
  -webkit-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.4);
  @media(min-width: 786px) {
    width: 60%;
  }
  label {
    color: #black;
    font-size: 1.2em;
    font-weight: 400;
  }
  .error {
    border: 2px solid #FF6565;
  }
  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    margin-left:85px;
    position: absolute;
    font-size: .8em;
  }
  h1 {
    text-align:center;
    color: #323232;
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
  @media(min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863AB;
  margin-top:10px;
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  &:hover {
    background: #1D3461;
  }
`;

// RegEx for phone number validation
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Schema for yup
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
    .min(50, "*Message must have at least 50 characters")
    .max(1000, "*Message can't be longer than 1000 characters")
    .required("*Message is required"),
});
const ContactForm = () => {
  return(
    <CONTAINER>
      <h1>Send your inquiry</h1>
      <Formik
        initialValues={{ name:"", email:"", phone:"", message:""}}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
          <MYFORM onSubmit={handleSubmit} className="mx-auto">

            <Form.Group controlId="formName">
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? "has-error" : ''}
              />
              {touched.name && errors.name ? (
                <div className="error-message">{errors.name}</div>
              ): null}
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? "has-error" : ''}
              />
              {touched.email && errors.email ? (
                <div className="error-message">{errors.email}</div>
              ): null}
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone :</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                className={touched.phone && errors.phone ? "has-error" : ''}
              />
              {touched.phone && errors.phone ? (
                <div className="error-message">{errors.phone}</div>
              ): null}
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>message :</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                placeholder="Type your message here"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className={touched.message && errors.message ? "has-error" :''}
              />
              {touched.message && errors.message ? (
                <div className="error-message">{errors.message}</div>
              ): null}
            </Form.Group>
            {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
            <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
            Submit
            </BUTTON>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
}

export default ContactForm;