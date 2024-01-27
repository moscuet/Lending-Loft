import { ErrorMessage, Field, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import authorService from '../services/authorService';
import { Author } from '../types';
import { toast } from 'react-toastify';
import { BUTTON, CANCELBUTTON, CONTAINER, MYFORM } from './ui/StyledComponenet'


type FormValue = { firstName: string, lastName: string, biography: string, _id: string }

export default function EditAuthor(props: { eId: string, editStatus: () => void }) {

  const [state, setState] = useState({ successful: false, loading: false, message: '' })

  const [author, setAuthor] = useState<Author>({
    firstName: '',
    lastName: '',
    biography: '',
    _id: ''
  })

  useEffect(() => {
    setState({ ...state, loading: true })
    authorService.getAuthorById(props.eId).then(res => {
      setAuthor(res.data)
      setState({ ...state, loading: false })
    },
    error => {
      toast.success('Failed to load author details!')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.eId]);

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('LastName is required'),
      biography: Yup.string().required('Biography is required'),
    })
  }

  const handleSubmit = (
    values: FormValue,
    { setSubmitting, resetForm }: FormikHelpers<FormValue>
  ) => {
    setSubmitting(true);

    authorService.updateAuthor(values)
      .then(response => {
        resetForm();
        toast.success("Succesfully Updated Author's Details!")
      })
      .catch(error => {
        toast.error("Failed to Update: " + error.message)
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <CONTAINER>
      <Formik
        enableReinitialize
        initialValues={author}
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
                  name="biography"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="biography"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <BUTTON style={{ marginRight: '4px' }} type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span style={{ marginLeft: '4px' }}>Submit</span>
                </BUTTON>

                <CANCELBUTTON type="button" style={{ marginRight: '4px' }} onClick={props.editStatus}>
                  <span >Cancel</span>
                </CANCELBUTTON>
              </div>
            </div>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>

  )
}