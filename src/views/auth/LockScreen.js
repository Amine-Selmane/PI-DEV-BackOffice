import React from 'react';
import axios from 'axios'; // Make sure to import axios

import {
  Button,
  Label,
  FormGroup,
  CardTitle,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { useNavigate , useLocation } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import img1 from '../../assets/images/users/user4.jpg';

const LockScreen = () => {
  const { state } = useLocation();
  const user = state?.user || {};
  
  const navigate = useNavigate();

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handlePasswordReset = async (values) => {

    try {
      
      const response = await axios.get('http://localhost:5000/api/createResetSession');

      if (response.status === 201) {
        // Session is valid, proceed with password reset
        await axios.put('http://localhost:5000/api/resetPassword', {
          username: user.username, // You may need to replace this with the actual username
          password: values.password,
        });

        alert('Password reset successful!');
        navigate('/auth/loginformik');
      } else {
        alert('Session expired. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error resetting password. Please try again.');
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
                <div className="text-center">
                <img src={user.profile || img1} alt="avatar" className="rounded-circle" width="95" />
                  <CardTitle tag="h4" className="mt-2">
                    {user.username}
                  </CardTitle>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => handlePasswordReset(fields)}
                  render={({ errors, touched }) => (
                    <Form className="mt-3">
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
                      <FormGroup>
                        <Button type="submit" color="info" block className="me-2">
                          Reset Password
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

export default LockScreen;
