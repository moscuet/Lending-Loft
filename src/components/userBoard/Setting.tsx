import { Formik, Field,  ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'

import React, { useState } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { AppState, USER_DATA } from '../../types'
//import userService from '../../services/userService'
import { updateUser } from '../../redux/actions'

const  Setting:React.FC =  () => {
  const user:USER_DATA  = useSelector( (state:AppState) =>state.auth.user)
  
  const [ state, setState] = useState({
    message:'',
    successful:false
  })

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      useremail: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      phoneNumber: Yup.string()
        .matches(new RegExp('[0-9]{10}'))
        .required('phone number is required'),
      address: Yup.string()
        .required('address is required')
        .max(255, 'Password must not exceed 255 characters'),
    })
  }
  const dispatch = useDispatch()

  const handleSubmit = async (formValue:USER_DATA) =>{
    //userService.updateUser(formValue,user._id)
    // .then( res=>{
    //   console.log('res from setting', res.data)
    //   setState({message:'saved', successful:true})

    // },
    // (error) =>{
    //   console.log('res error from setting', error)

    //   setState({message:'Not saved', successful:false})
    // }
    // )
    try {
      await dispatch(updateUser(formValue,user._id))
      setState({ ...state,
        message: 'user updated',
        successful:true,
      });
      // props.history.push("/");
      // window.location.reload();
 
    } catch(error){
      console.log('error',error)
      setState({ ...state,
        message: 'user not updated',
        successful:false,
      });
    }


  }

  return (
    <div>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {!state.message && (
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
                <label htmlFor="useremail">User Email</label>
                <Field
                  name="useremail"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="useremail"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
      
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field
                  name="address"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
                
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number</label>
                <Field
                  name="phonenumber"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="phonenumber"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
      
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                          Submit
                </button>
              </div>
      
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
  )
}

export default Setting



