import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from "formik";
import { FormikHelpers } from 'formik';

import contactService from '../../services/contactService'
import { BUTTON, CONTAINER, MYFORM } from '../SignupForm';
import { toast } from 'react-toastify';

const mobileRegExp = /^\+?\d{7,13}$/

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  email: Yup.string()
    .email("*Must be a valid email address")
    .max(500, "*Email must be less than 500 characters")
    .required("*Email is required"),
  mobile: Yup.string()
    .matches(mobileRegExp, "Valid phone number (7-13 digits, start with optional '+').")
    .required("*mobile number required"),
  message: Yup.string()
    .min(20, "*Message must have at least 20 characters")
    .max(1000, "*Message can't be longer than 1000 characters")
    .required("*Message is required"),
});

const ContactForm = () => {
  interface FormValues {
    name: string;
    email: string;
    mobile: string;
    message: string;
  }

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setSubmitting(true);

    contactService.sendMessage(values)
      .then(response => {
        resetForm();
        toast.success('Thank you for reaching out! I will get back to you soon.')
      })
      .catch(error => {
        toast.error('Failed to send message. Please try again later.')
      })
      .finally(() => {
        setSubmitting(false);
      });
  };



  return (
    <CONTAINER>
      <h2 >SAY HELLO!</h2>
      <Formik
        initialValues={{ name: "", email: "", mobile: "", message: "" }}
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
              <label htmlFor="mobile">Mobile</label>
              <Field name="mobile" type="text" className="form-control" />
              <ErrorMessage name="mobile" component="div" className="alert alert-danger" />
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
                <span style={{ marginLeft: '8px' }}>Submit</span>
              </BUTTON>
            </div>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
}

export default ContactForm;