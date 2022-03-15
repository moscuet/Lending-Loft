import React, { useState, ReactElement } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import authorService from '../../services/authorService'

const  AddAuthor= (): ReactElement => {

  const authorlist:string[] = ['dfdfa','1133','13133']
  console.log(authorlist)

 
  
  const initialValues = {
    firstName: '',
    lastName: '',
    biography: 'biography'
  }

  const [state, setState] = useState({...initialValues,successful: false, loading:false,message:''})

  
  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('LastName is required'),
      biography: Yup.string().required('Biography is required'),
    })
  }

  function handleAddMore (){
    setState({ ...state, successful:false, message:''})
  }
  function handleAddBook(formValue: {
    firstName: string,
    lastName: string,
    biography: string,
  }) {
    console.log('hello from frontend form adBook', formValue)

    setState({ ...state, loading:true})

 
    authorService.addAuthor( formValue).then(
      (response) => {
        console.log('from add book',response.data)
        setState({ ...state, successful: true , loading:false, message:'Author added'})
      },
      (error) => {
        setState({
          ...state,
          successful: false,
          loading:false,
          message:'Author not added'

        })
        console.log(error)
      }
    )
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddBook}
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
                  <span>Add Author</span>
                </button>
              </div>
            )
            }
            {state.successful && (
              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick = {handleAddMore} >
                  <span>Add more</span>
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

export default AddAuthor
