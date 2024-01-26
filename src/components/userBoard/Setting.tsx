import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, USER_DATA } from '../../types';
import { updateUser } from '../../redux/actions';
import { BUTTON, FormRow, CONTAINER, MYFORM } from '../SignupForm'; // Import common styled components

const Setting: React.FC<{ onSaved: () => void }> = ({ onSaved }) => {
  const user: USER_DATA = useSelector((state: AppState) => state.auth.user);

  function validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      useremail: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      phoneNumber: Yup.string()
        .matches(new RegExp('[0-9]{10}'))
        .required('Phone number is required'),
      address: Yup.string()
        .required('Address is required')
        .max(255, 'Password must not exceed 255 characters'),
    });
  }
  const dispatch = useDispatch();

  const handleSubmit = async (formValue: USER_DATA, { setSubmitting }: any) => {
    try {
      await dispatch(updateUser(formValue, user._id));
      onSaved();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    useremail: user.useremail,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };

  return (
    <CONTAINER>
      <h2>Edit Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <MYFORM>
            <div>
              <FormRow>
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
              </FormRow>
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
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <BUTTON type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span style={{ marginLeft: '4px' }}>Save Changes</span>
                </BUTTON>
              </div>
            </div>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default Setting;
