import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import userService from '../services/userService'
import productService from '../services/productService'
export default function EditBook(props: {
  eId: string
  editStatus: () => void
}) {
  const [state, setState] = useState({
    successful: false,
    loading: false,
    message: '',
  })

  const [book, setBook] = useState({
    ISBN: '',
    title: '',
    publisherName: '',
    author: '',
    publishedYear: 0,
    genres: '',
    description: '',
    edition: '',
    pageCount: 0,
    img: '',
    _id: '',
  })

  // delete later
  useEffect(() => {
    setState({ ...state, loading: false })
    userService.getSingleBook(props.eId).then(
      (res) => {
        const authorId = res.data.authors
          .map((a: { _id: string }) => a._id)
          .join()
        const newBook = {
          ...res.data,
          genres: res.data.genres?.join(),
          author:authorId
        }
        setBook(newBook)
        setState({ ...state, loading: false })
      },
      (error) => {
        console.log('error', error)
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.eId])

  function validationSchema() {
    return Yup.object().shape({
      ISBN: Yup.string().required('ISBN required'),
      title: Yup.string().required('Title is required'),
      publisherName: Yup.string().required('Published year is required'),
      author: Yup.string().required('authors Id is required'),
      publishedYear: Yup.number(),
      genres: Yup.string(),
      description: Yup.string()
        .required('description is required')
        .min(10, 'description must be at least 10 characters')
        .max(500, 'description must not exceed 500 characters'),
      edition: Yup.string().required('edition is required'),
      pageCount: Yup.number().required('Page count is required'),
      img: Yup.string().required('image link required'),
    })
  }

  function handleSubmit(formValue: {
    ISBN: string
    title: string
    publisherName: string
    author: string
    publishedYear: number
    genres: string
    description: string
    edition: string
    pageCount: number
    img: string,
    _id:string
  }) {
    const book = {...formValue, author:formValue.author.split(','), genres:formValue.genres.split(',')}

    productService.updateBook(book).then( res=>{
      setState({...state, successful:true, message: 'Updater Book'})
      props.editStatus()
    })

  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Formik
          enableReinitialize
          initialValues={book}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {!state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="ISBN">ISBN</label>
                  <Field name="ISBN" type="text" className="form-control" />
                  <ErrorMessage
                    name="ISBN"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" className="form-control" />
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
                  <label
                    htmlFor="author"
                    placeholder="ex:61a9759da3eb1c07c18c3e71"
                  >
                    Author Id separated by comma ex:61a9759da3eb1c07c18c3e71
                  </label>
                  <Field name="author" type="text" className="form-control" />
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
                  <Field name="genres" type="text" className="form-control" />
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
                  <Field name="edition" type="text" className="form-control" />
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
                  <Field name="img" type="text" className="form-control" />
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
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={state.loading}
                >
                  {state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Edit Book</span>
                </button>
              </div>
            )}

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
