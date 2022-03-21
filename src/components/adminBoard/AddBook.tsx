import React, { useState, ReactElement } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import productService from '../../services/productService'

const  AddBook= (): ReactElement => {

  const initialValues = {
    ISBN: '',
    title: '',
    publisherName: '',
    author: '',
    publishedYear: 0,
    genres: '',
    description: '',
    edition: '',
    pageCount: 0,
    img: ''
  }

  const [state, setState] = useState({...initialValues,successful: false, loading:false,message:''})
  

  function validationSchema() {
    return Yup.object().shape({
      ISBN: Yup.string().required('ISBN required'),
      title: Yup.string().required('Title is required'),
      publisherName: Yup.string().required('Published year is required'),
      author:Yup.string().required('author number is required'),
      publishedYear:Yup.number(),
      genres:Yup.string(),
      description:Yup.string()
        .required('description is required')
        .min(10, 'description must be at least 10 characters')
        .max(500, 'description must not exceed 500 characters'),
      edition:Yup.string().required('edition is required'),
      pageCount:Yup.number().required('Page count is required'),
      img: Yup.string().required('image link required')
    })
  }
  
  function handleAddMore (){
    setState({ ...state, successful:false, message:''})
  }
  function handleAddBook(formValue: {
    ISBN: string
    title: string
    publisherName: string
    author: string
    publishedYear: number
    genres: string
    description: string
    edition: string
    pageCount: number
    img: string
  }) {
    setState({ ...state, loading:true})

    productService.addBook( formValue).then(
      (response) => {
        setState({ ...state, successful: true , loading:false, message:'Book added'})
     
      },
      (error) => {
        setState({
          ...state,
          successful: false,
          message:'Book not added'
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
                  <label htmlFor="ISBN">ISBN</label>
                  <Field
                    name="ISBN"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="ISBN"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publisherName">Publisher Name</label>
                  <Field
                    name="publisherName"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="publisherName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author" placeholder = 'ex:61a9759da3eb1c07c18c3e71'>Author Id ex:61a9759da3eb1c07c18c3e71</label>
                  <Field
                    name="author"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publishedYear">Published Year</label>
                  <Field
                    name="publishedYear"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="publishedYear"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="genres">Genres</label>
                  <Field
                    name="genres"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="genres"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    name="description"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edition">Edition</label>
                  <Field
                    name="edition"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="edition"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pageCount">Page Count</label>
                  <Field
                    name="pageCount"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="pageCount"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="img">Image link</label>
                  <Field
                    name="img"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="img"
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

export default AddBook
