import { Component } from "react";
//import { RouteComponentProps } from "react-router-dom";
//import { createBrowserHistory } from 'history'
//import { History } from 'history';

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../../services/authService";
//const history = createBrowserHistory({})

interface RouterProps {
    history: {
        push(url: string): void;
    };
   
}

type State = {
  useremail: string,
  password: string,
  loading: boolean,
  message: string
};

export default class Login extends Component<RouterProps, State> {
  constructor(props: RouterProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      useremail: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      useremail: Yup.string()
        .required("This field is required!")
        .email('Email is invalid'),
      password: Yup.string().required("This field is required!"),
    });
  }

  handleLogin(formValue: { useremail: string; password: string }) {
    const { useremail, password } = formValue;
    console.log( 'from login form useremail and pass',useremail, password )
    this.setState({
      message: "",
      loading: true
    });


    AuthService.login(useremail, password).then(
      () => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    const { loading, message } = this.state;

    const initialValues = {
      useremail: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="useremail">useremail</label>
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
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}