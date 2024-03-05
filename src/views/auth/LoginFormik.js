import React from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

const LoginFormik = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '', // Change email to username to match backend
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'), // Change email to username
    password: Yup.string()
      .required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', values); // Assuming your backend API endpoint for login is '/api/login'
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in local storage or redux store for future requests
      navigate('/dashboards/minimal'); // Redirect to home page on successful login
    } catch (error) {
      if (error.response) {
        // Server responded with a status code that falls out of the range of 2xx
        setErrors({ password: 'Invalid username or password' }); // Set error message for password field
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <h5 className="mb-0">Login</h5>
                <small className="pb-4 d-block">
                  Do not have an account? <Link to="/auth/registerformik">Sign Up</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin} // Pass handleLogin function to onSubmit prop
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="username">Username</Label> {/* Change label to Username */}
                        <Field
                          name="username" // Change name to username
                          type="text"
                          className={`form-control${
                            errors.username && touched.username ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="username" component="div" className="invalid-feedback" /> {/* Change name to username */}
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Remember me
                        </Label>
                        <Link className="ms-auto text-decoration-none" to="/auth/recoverpwd">
                          <small>Forgot Pwd?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
