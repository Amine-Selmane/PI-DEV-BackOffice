import React , { useState }from 'react';
import { Button, FormGroup, CardTitle, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import  toast,{ Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { useNavigate , useLocation} from 'react-router-dom';

import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
import AuthLogo from '../../layouts/logo/AuthLogo';

import {verifyOTP } from '../../helper/helpers';
import useAuthStore  from '../../store/storeUser';

import img1 from '../../assets/images/users/user4.jpg';

const Maintanance = () => {
  const { email } = useAuthStore(state => state.auth);
const [code, setOTP] = useState();
const { state } = useLocation();
  const user = state?.user || {};
const validationSchema = Yup.object().shape({
  
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 characters'),
});

  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ email, code });
      if (status === 201) {
        toast.success('Verify Successfully!');
        navigate('/auth/lockscreen', { state: { user } });
        return Promise.resolve(); // Return a resolved promise
      } 
        return Promise.reject(new Error('Verification failed')); // Return a rejected promise
      
    } catch (error) {
      toast.error('Wrong OTP! Check email again!');
      return Promise.reject(error); // Return a rejected promise
    }
  }
  
  


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

                  initialValues={{  otp: '' }}
                  validationSchema={validationSchema}
                   onSubmit = {onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="mt-3">
                      
                      <FormGroup>
                        <Field
                          type="text"
                          name="otp"
                          className={`form-control${errors.otp && touched.otp ? ' is-invalid' : ''}`}
                          placeholder="Enter OTP"
                          value={code}
                          onChange={(e) => setOTP(e.target.value) }
                        />
                        <ErrorMessage name="otp" component="div" className="text-danger" />
                      </FormGroup>
                      
                        <Button type="submit" color="info" block onClick={onSubmit}>
                                         Reset
                        </Button>
                      
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

export default Maintanance;
