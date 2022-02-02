import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import authorService from '../services/authorService';
import { Author } from '../types';

export default function EditAuthor(id:{eId:string}) {

  //   const initialValues = {
  //     firstName: '',
  //     lastName: '',
  //     biography: ''
  //   }

  const [state, setState] = useState({successful: false, loading:false,message:''})
  const [message, setMessage] = useState('')

  const [author, setAuthor] = useState<Author>({
    firstName: '',
    lastName: '',
    biography: 'hello',
    _id: ''
  })

  // delete later
  console.log(message)
  console.log('hello')
  useEffect(() => {
    console.log('hell2')
    authorService.getAuthorById(id.eId).then( res =>{
      setAuthor(res.data)
      console.log('hello3', res.data, author)


    })
    console.log('Author after useeffect', author)
    setMessage('')
    setState(state)
    console.log('hello4')

  }, [id.eId]);

  function validationSchema() {

    return Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('LastName is required'),
      biography: Yup.string().required('Biography is required'),
    })
  }

  function handleSubmit (){

  }
  console.log('hello5', author)
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={author}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {!state.successful && (
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
                
              </div>
            )}

            {!state.successful && (
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={state.loading}>
                  {state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Add Book</span>
                </button>
              </div>
            )
            }         

            {state.message && (
              <div className="form-group">
                <div
                  className={
                    state.successful
                      ? 'alert alert-success'
                      : 'alert alert-danger'
                  }
                  role="alert"
                >
                  {state.message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}