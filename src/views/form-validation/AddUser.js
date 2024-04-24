import React, { useState } from 'react';
//import axios from 'axios';
import { Row, Col, Button, FormGroup, Label  } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import ComponentCard from '../../components/ComponentCard';

const FormValidate = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(); // initialise the hook
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '', 
    email: '',
    dateNaiss: '',
    address: '',
    mobile: '',
    sexe: '',
    role: '',
    password: '',
    grade:'',
  });
  


  const onSubmit = (data) => {
    // Here you can make an HTTP request to your Spring Boot backend to submit the product data
    // Example using fetch API
    fetch('http://localhost:5000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
      console.log('Success:', responseData);
      // Optionally, you can handle success response here, like showing a success message or redirecting
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optionally, you can handle error response here, like showing an error message
    });
    navigate('/tables/user-table');
    setUser(data);
  };

  
  
  return (
    <>
      <Row>
        <Col sm="12">
          <ComponentCard title="Form Validation">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className="control-Label" htmlFor="firstName">
                  First name *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('firstName', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.firstName && 'First name is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="lastName">
                  Last name *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('lastName', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.lastName && 'Last name is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="username">
                  Username *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('username', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.username && 'Username is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="password">
                  Password *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('password', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.password && 'Password is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="email">
                  Email *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.email && 'Email is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="mobile">
                  Mobile No *
                </Label>
                <div className="mb-2">
                  <input
                    type="number"
                    {...register('mobile', { required: true, maxLength: 8, minLength: 8 })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">
                  {errors.mobile && 'Enter a Valid mobile number.'}
                </span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="address">
                  Address *
                </Label>
                <div className="mb-2">
                  <input
                    type="text"
                    {...register('address', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.address && 'Address is required.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="dateNaiss">
                  Birthdate *
                </Label>
                <div className="mb-2">
                  <input
                    type="date"
                    {...register('dateNaiss', { required: true })}
                    className="form-control"
                  />
                </div>
                <span className="text-danger">{errors.dateNaiss && 'Please enter your Birthdate.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="sexe">
                  Select Gender *
                </Label>
                <div className="mb-2">
                  <select
                    className="form-control"
                    {...register('sexe', { required: true })}
                  >
                    <option value="">Select Option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <span className="text-danger">{errors.sexe && 'Please select value.'}</span>
              </FormGroup>
              <FormGroup>
                <Label className="control-Label" htmlFor="role">
                  Select Role *
                </Label>
                <div className="mb-2">
                  <select
                    className="form-control"
                    {...register('role', { required: true })}
                  >
                    <option value="">Select Option</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <span className="text-danger">{errors.role && 'Please select value.'}</span>
              </FormGroup>
              <FormGroup>
                            <Label>Grade</Label><br/>
                            <select name="grade" value={userData.grade} onChange={handleInputChange} style={selectStyle}>
                              <option value="Beginner">1st year (Beginner)</option>
                              <option value="2nd year">2nd year (Sophomore)</option>
                              <option value="3rd year">3rd year (Junior)</option>
                              <option value="4th year">4th year (Senior)</option>
                              <option value="5th year">5th year</option>
                              <option value="6th year">6th year</option>
                              <option value="terminal">7th year (Terminal)</option>
                            </select>
                          </FormGroup>
              <FormGroup>
                <Button className="button btn-info" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </form>
            <hr />
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
};

export default FormValidate;
