import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react';
import authorService from '../services/authorService';
import { Author } from '../types';

export default function EditAuthor(props:{eId:string, editStatus:()=>void} ){


  const [state, setState] = useState({successful: false, loading:false,message:''})

  const [author, setAuthor] = useState<Author>({
    firstName: '',
    lastName: '',
    biography: '',
    _id: ''
  })

  useEffect(() => {
    setState({...state,loading:true})
    authorService.getAuthorById(props.eId).then( res =>{
      setAuthor(res.data)
      setState({...state,loading:false})
    },
    (error)=>{
      console.log('error',error)
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

  function handleSubmit (formValue:{firstName:string, lastName:string, biography:string,_id:string}){
    authorService.updateAuthor(formValue).then(res=>{
      setState({...state, successful:true, message: 'Updater Author'})
      props.editStatus()
    },
    (error)=>{
      console.log(error)
    }
    )
  }
  console.log('hello5', author)
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          enableReinitialize
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
                  <span>Update Author</span>
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