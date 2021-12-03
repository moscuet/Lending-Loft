// import React, {ReactElement, useState } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { string } from 'yup/lib/locale';

// function validationSchema() {
//   return Yup.object().shape({
//     firstName: Yup.string().required('Fullname is required'),
//     lastName: Yup.string().required('Fullname is required'),
//     email: Yup.string()
//       .required('Email is required')
//       .email('Email is invalid'),
//     phoneNumber:Yup.string()
//       .matches(new RegExp('[0-9]{7}'))
//       .required('phone number is required'),
//     address: Yup.string()
//       .required('address is required')
//       .max(255, 'Password must not exceed 255 characters'),
//     password: Yup.string()
//       .required('Password is required')
//       .min(6, 'Password must be at least 6 characters')
//       .max(40, 'Password must not exceed 40 characters'),
//     confirmPassword: Yup.string()
//       .required('Confirm Password is required')
//       .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
//     // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
//   });
// }
// function handleRegister(formValue: { firstName: string; lastName: string; email: string; phoneNumber:string, address: string; password: string }) {
//   const { firstName, lastName, email, phoneNumber, address, password } = formValue;

//   console.log(firstName)

// }
//   type Props = {}
//   type TInitialstate = {
//     firstName: string
//     lastName: string
//     email: string
//     phoneNumber: string
//     address: string
//     password: string
//     confirmPassword: string     
//     acceptTerms: boolean
//     successful: boolean,
//     message: string
//   }
// export default function RegisterForm<Props>():ReactElement {


//   const initialState = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//     acceptTerms: false,
//     successful: false,
//     message: ''
//   };
    

    
//   const [state, setState] = useState<TInitialstate>(initialState)
 
//   const { successful, message } = state;

//   return  (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <Formik
//           initialValues={initialState}
//           validationSchema={validationSchema}
//           onSubmit={handleRegister}
//         >
//           <Form>
//             {!successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name</label>
//                   <Field name="firstName" type="text" className="form-control" />
//                   <ErrorMessage
//                     name="firstName"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name</label>
//                   <Field name="lastName" type="text" className="form-control" />
//                   <ErrorMessage
//                     name="firstName"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>
  
//                 <div className="form-group">
//                   <label htmlFor="email"> Email </label>
//                   <Field name="email" type="email" className="form-control" />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="phoneNumber"> Phone Number</label>
//                   <Field name="phoneNumber" type="text" className="form-control" />
//                   <ErrorMessage
//                     name="phoneNumber"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="address"> Address </label>
//                   <Field name="address" type="address" className="form-control" />
//                   <ErrorMessage
//                     name="address"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

  
//                 <div className="form-group">
//                   <label htmlFor="password"> Password </label>
//                   <Field
//                     name="password"
//                     type="password"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>
  
//                 <div className="form-group">
//                   <button  type="submit" className="btn btn-primary btn-block">Sign Up</button>
//                 </div>
//               </div>
//             )}
  
//             {message && (
//               <div className="form-group">
//                 <div
//                   className={
//                     successful ? "alert alert-success" : "alert alert-danger"
//                   }
//                   role="alert"
//                 >
//                   {message}
//                 </div>
//               </div>
//             )}
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
    
// }