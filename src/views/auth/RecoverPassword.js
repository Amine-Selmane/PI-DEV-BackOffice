import React, { useState } from 'react';
import { Button, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {  useNavigate }  from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { generateOTP, verifyOTP, getUserByEmail } from '../../helper/helpers';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [user, setUser] = useState(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 characters'),
  });

  const handleSendOTP = async (email) => {
    try {
      const fetchedUser = await getUserByEmail(email);
      if (fetchedUser) {
        await generateOTP(fetchedUser.email);
        setOtpSent(true);
        toast.success('OTP has been sent to your email address!');
        setUser(fetchedUser); // Set the user state
      } else {
        toast.error('User not found!');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP!');
    }
  };

  const handleButtonClick = () => {
    if (user) {
      // Pass user data to Maintanance component when navigating
      navigate('/auth/maintanance', { state: { user } });
    } else {
      toast.error('User data not available. Please try again.');
    }
  };
  const handleResetPassword = async (values) => {
    try {
      const response = await verifyOTP({ code: values.otp });
      if (response.status === 201) {
        toast.success('OTP verification successful!');
        navigate('/auth/maintanance');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Wrong OTP! Please check your email again.');
    }
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
          
                <Formik
                  initialValues={{ email: '', otp: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleResetPassword}
                >
                  {({ errors, touched }) => (
                    <Form className="mt-3">
                      <FormGroup>
                        <Field
                          type="email"
                          name="email"
                          className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`}
                          placeholder="Enter your email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </FormGroup>
                      
                      {!otpSent ? (
                        <Button
                          type="button"
                          color="info"
                          block
                          onClick={() => handleSendOTP(emailInput)}
                        >
                          Send OTP
                        </Button>
                      ) : (
                        <Button type="submit" color="info" block onClick={handleButtonClick}>
                          Reset
                        </Button>
                      )}
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default RecoverPassword;