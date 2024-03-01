
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

const RegisterFormik = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState('');

  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',  // Updated to camelCase
    email: '',
    dateNaiss: new Date(), // Updated with initial date value
    mobile: '',
    address: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    dateNaiss: Yup.date().required('Date is required'),
    mobile: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const handleSubmit = async (fields) => {
    try {
      const { firstName, lastName, userName, email, password, dateNaiss, address, mobile } = fields;
      
      // Format the date before sending
      const formattedDateNaiss = dateNaiss.toISOString().split('T')[0]; // Format 'yyyy-MM-dd'

      // Send an HTTP POST request to the backend API endpoint
      await axios.post('http://localhost:5000/api/register/admin', {
        username: userName,  // Updated to camelCase
        password,
        firstName,
        lastName,
        profile: uploadedFile,
        email,
        dateNaiss: formattedDateNaiss,
        address,
        mobile
      });

    
      // Registration successful, you can redirect the user to another page or show a success message
      alert('Registration successful!');
      navigate('/auth/loginformik'); // Redirect to the login page after successful registration
    } catch (error) {
      // Handle registration error, you can display an error message or perform any other action
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setUploadedFile(base64);
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
                <h5 className="mb-0">Register</h5>
                <small className="pb-4 d-block">
                  Already have an account? <Link to="/auth/loginformik">Login</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  render={({ errors, touched }) => (
                    <Form>
                        <FormGroup>
                          <Label htmlFor="firstName">First Name</Label>
                          <Field
                            name="firstName"
                            type="text"
                            className={`form-control ${
                              errors.firstName && touched.firstName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Field
                            name="lastName"
                            type="text"
                            className={`form-control ${
                              errors.lastName && touched.lastName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="userName">User Name</Label>
                          <Field
                            name="userName"
                            type="text"
                            className={`form-control ${
                              errors.userName && touched.userName ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="email">Email</Label>
                          <Field
                            name="email"
                            type="email"
                            className={`form-control ${
                              errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        


                        <FormGroup>
                        <Label htmlFor="dateNaiss">Date de naissance</Label>
                        <Field name="dateNaiss">
                          {({ field, form }) => (
                            <DatePicker
                              {...field}
                              selected={field.value}
                              onChange={(date) => form.setFieldValue(field.name, date)}
                              className={`form-control ${errors.dateNaiss && touched.dateNaiss ? 'is-invalid' : ''}`}
                              dateFormat="yyyy-MM-dd" // Format de date
                            />
                          )}
                        </Field>
                        <ErrorMessage name="dateNaiss" component="div" className="invalid-feedback" />
                      </FormGroup>


                        <FormGroup>
                          <Label htmlFor="mobile">Phone number</Label>
                          <Field
                            name="mobile"
                            type="number"
                            className={`form-control ${
                              errors.mobile && touched.mobile ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="mobile"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>


                        <FormGroup>
                          <Label htmlFor="address">Address</Label>
                          <Field
                            name="address"
                            type="text"
                            className={`form-control ${
                              errors.address && touched.address ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Field
                            name="password"
                            type="password"
                            className={`form-control ${
                              errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className={`form-control ${
                              errors.confirmPassword && touched.confirmPassword
                                ? ' is-invalid'
                                : ''
                            }`}
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="profile">Profile Picture</Label>
                          <Field
                            name="profile"
                            type="file"
                            className={`form-control ${
                              errors.profile && touched.profile ? ' is-invalid' : ''
                            }`}
                            onChange={onUpload}
                          />
                          <ErrorMessage
                            name="profile"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Field
                            type="checkbox"
                            name="acceptTerms"
                            className={`form-check-input ${
                              errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                            }`}
                          />
                          <Label htmlFor="acceptTerms" className="form-check-label">
                            I accept the Terms & Conditions
                          </Label>
                          <ErrorMessage
                            name="acceptTerms"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>

                        <div className="mt-4 text-center">
                          <Button type="submit" color="primary" className="w-md">
                            Register
                          </Button>
                        </div>
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

export default RegisterFormik;
