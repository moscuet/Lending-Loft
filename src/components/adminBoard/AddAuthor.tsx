import React, { ReactElement } from 'react'
import { Formik, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import authorService from '../../services/authorService'
import { toast } from 'react-toastify'
import { BUTTON, CONTAINER, MYFORM } from '../ui/StyledComponenet'

type FormValue = {
  firstName: string,
  lastName: string,
  biography: string,
}

const AddAuthor = (): ReactElement => {

  const initialValues = {
    firstName: '',
    lastName: '',
    biography: ''
  }

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('LastName is required'),
      biography: Yup.string().required('Biography is required').max(980, 'Biography cannot be more than 980 characters'),
    })
  }


  const handleSubmit = (
    values: FormValue,
    { setSubmitting, resetForm }: FormikHelpers<FormValue>
  ) => {
    setSubmitting(true);

    authorService.addAuthor(values)
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <MYFORM onSubmit={handleSubmit}>
            <div>
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
                <label htmlFor="biography">Biography</label>
                <Field
                  as="textarea"
                  name="biography"
                  className="form-control"
                  rows="5"
                />
                <ErrorMessage
                  name="biography"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <BUTTON type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span style={{ marginLeft: '4px' }}>Submit</span>
                </BUTTON>
              </div>
            </div>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  )
}

export default AddAuthor
