import { useState, ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../types'
import { NavLink, Navigate,useNavigate } from 'react-router-dom'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { login } from '../redux/actions/auth'
import { BUTTON, CONTAINER, MYFORM } from './ui/StyledComponenet'
import TestLoginPopup from './ui/InfoPopup'

const Signin = (): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { isLoggedIn, user } = useSelector((state: AppState) => state.auth)
  const [showPopup, setShowPopup] = useState(false);

  const [userState, setUserState] = useState({
    useremail: '',
    password: '',
    loading: false,
    isLoggedIn: false,
    message: '',
  })

  const initialValues = {
    useremail: '',
    password: '',
  }

  function validationSchema() {
    return Yup.object().shape({
      useremail: Yup.string()
        .required('This field is required!')
        .email('Email is invalid'),
      password: Yup.string().required('This field is required!'),
    })
  }

  const handleSignin = async (formValue: {
    useremail: string
    password: string
  }) => {
    const { useremail, password } = formValue
    setUserState({
      ...userState,
      loading: true,
    })

    try {
      await dispatch(login(useremail, password))
      setUserState({
        ...userState,
        loading: false,
        isLoggedIn: true,
      })
    } catch (error) {
      setUserState({
        ...userState,
        loading: false,
        message: 'invalid email and password',
      })
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      user.roles === 'admin' && navigate('/admin')
      user.roles === 'user' && navigate('/user')
      
    }
  }, [isLoggedIn, user, navigate])

  if (isLoggedIn) {
    ;<Navigate to="/login" />
  }
  return (
    <CONTAINER>
      <h2>Sign In</h2>
      <NavLink to={'#'} onClick={() => setShowPopup(true)}>Show test login credential</NavLink>
      {showPopup && <TestLoginPopup closePopup={() => setShowPopup(false)} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignin}
      >
        <MYFORM>
          <div className="form-group">
            <label htmlFor="useremail">User Email</label>
            <Field name="useremail" type="text" className="form-control" />
            <ErrorMessage
              name="useremail"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <BUTTON type="submit" disabled={userState.loading}>
              {userState.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </BUTTON>
            <span style={{ marginRight: '1em' }}>Not registered yet?</span>
            <NavLink to={`/signup`} style={{ color: 'var(--link-color)' }}>
              Register
            </NavLink>
          </div>

          {userState.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {userState.message}
              </div>
            </div>
          )}
        </MYFORM>
      </Formik>
    </CONTAINER>
  )
}

export default Signin
