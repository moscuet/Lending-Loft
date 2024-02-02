import { ErrorMessage, Field, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import userService from '../../services/userService'
import { BUTTON, CANCELBUTTON, CONTAINER, FormRow, LoaderContainer, MYFORM } from '../ui/StyledComponenet'
import { Author, BookFormEditValues } from '../../types'
import authorService from '../../services/authorService'
import { commonGenres } from '../../consts'
import { toast } from 'react-toastify'
import Loader from 'react-ts-loaders'
import productService from '../../services/productService'

const initialValues = {
  ISBN: '',
  title: '',
  publisherName: '',
  authors: [''],
  publishedYear: 0,
  genres: ['action'],
  description: '',
  edition: '',
  pageCount: 0,
  img: '',
  _id: ''
}

const EditBook = (props: {
  eId: string
  editStatus: () => void
}) => {
  const [book, setBook] = useState(initialValues)
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    authorService.getAllAuthor()
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        toast.error(`Failed to load author list: ${error.message}`)
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    userService.getSingleBook(props.eId)
      .then(
        (res) => {
          const authorsId = res.data.authors.map((a: { _id: string }) => a._id);
          const newBook = {
            ...res.data,
            authors: authorsId
          };
          setBook(newBook);
        },
        (error) => {
          toast.error(`Failed to load Book's details: ${error.message}`);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [props.eId]);


  function validationSchema() {
    return Yup.object().shape({
      ISBN: Yup.string()
        .required('ISBN required')
        .matches(
          /^(?:\d{13}|\d{3}-\d{2}-\d{5}-\d{2}-\d{1})$/,
          "13 digits, optionally separated by '-' (e.g., XXX-XX-XXXXX-XX-X)"
        ),
      title: Yup.string().required('Title is required'),
      publisherName: Yup.string(),
      authors: Yup.array().of(Yup.string()).required('Author Id is required'),
      publishedYear: Yup.number(),
      genres: Yup.array()
        .of(Yup.string())
        .required('Genres is required')
        .min(1, 'At least one genre is required'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(980, 'Description must not exceed 500 characters'),
      edition: Yup.string(),
      pageCount: Yup.number().required('Page count is required').min(10, 'Page count must be at least 10'),
      img: Yup.string().required('Image link / source path required')
    })
  }


  const handleSubmit = (
    formValue: BookFormEditValues,
    { setSubmitting, resetForm }: FormikHelpers<BookFormEditValues>
  ) => {
    setSubmitting(true);
    const book = { ...formValue, authors: formValue.authors.join(','), genres: formValue.genres.join(',') }
   
    console.log('The book', formValue,book)
    productService.updateBook(book)
      .then(response => {
        resetForm();
        toast.success("Successfully update the book's details!")
        props.editStatus()
      })
      .catch(error => {
        toast.error(`Failed to update the book's details: ${error.message}`)
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (

    <>
      {
        loading && <LoaderContainer>
          <Loader type="spinner" color="var(--loader-color)" />
        </LoaderContainer>
      }

      {!loading && <CONTAINER>
        <Formik
          enableReinitialize
          initialValues={book}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <MYFORM onSubmit={handleSubmit}>
              <FormRow>
                <div className="form-group">
                  <label htmlFor="title">*Title</label>
                  <Field name="title" type="text" className="form-control" />
                  <ErrorMessage name="title" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="ISBN">*ISBN</label>
                  <Field name="ISBN" type="text" className="form-control" placeholder="123-45-67890-12-3" />
                  <ErrorMessage name="ISBN" component="div" className="alert alert-danger" />
                </div>
              </FormRow>

              <FormRow>
                <div className="form-group">
                  <label htmlFor="author">*Author Id</label>
                  <Field as="select" name="authors" className="form-control" >
                    {authors.map(author => (
                      <option key={author._id} value={author._id}>{`${author.firstName} ${author.lastName} (${author._id.slice(-8)})`}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="author" component="div" className="alert alert-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="publisherName">Publisher Name</label>
                  <Field name="publisherName" type="text" className="form-control" />
                  <ErrorMessage name="publisherName" component="div" className="alert alert-danger" />
                </div>
              </FormRow>

              <FormRow>
                <div className="form-group">
                  <label htmlFor="genres">*Genres</label>
                  <Field as="select" name="genres" multiple className="form-control" size="3">
                    {commonGenres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="genres" component="div" className="alert alert-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="pageCount">*Page Count</label>
                  <Field name="pageCount" type="number" className="form-control" />
                  <ErrorMessage name="pageCount" component="div" className="alert alert-danger" />
                </div>
              </FormRow>

              <FormRow>
                <div className="form-group">
                  <label htmlFor="publishedYear">Published Year</label>
                  <Field name="publishedYear" type="number" className="form-control" />
                  <ErrorMessage name="publishedYear" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="edition">Edition</label>
                  <Field name="edition" type="text" className="form-control" />
                  <ErrorMessage name="edition" component="div" className="alert alert-danger" />
                </div>
              </FormRow>

              <div className="form-group">
                <label htmlFor="description">*Description</label>
                <Field name="description" type="text" className="form-control" />
                <ErrorMessage name="description" component="div" className="alert alert-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="img">*Image Link</label>
                <Field name="img" type="text" className="form-control" placeholder='book-1.jpg' />
                <ErrorMessage name="img" component="div" className="alert alert-danger" />
              </div>

              <div className="form-group">
                <BUTTON type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span style={{ marginLeft: '8px' }}>Submit</span>
                </BUTTON>
                <CANCELBUTTON type="button" style={{ marginRight: '4px' }} onClick={props.editStatus}>
                  <span >Cancel</span>
                </CANCELBUTTON>
              </div>
            </MYFORM>
          )}
        </Formik>
      </CONTAINER>}
    </>
  )
}


export default EditBook