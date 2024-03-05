import React, { useState , useEffect } from 'react';
//import axios from 'axios';
import { Row, Col, Button, FormGroup, Label  } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate , useParams } from 'react-router-dom'; // Import useNavigate

import ComponentCard from '../../components/ComponentCard';

const FormValidate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // initialise the hook
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { UserId } = useParams();

  useEffect(() => {
    console.log("User ID:", UserId);
    // Fetch News details based on bookingId
    fetch(`http://localhost:5000/api/user/ById/${UserId}`)
      .then(response => response.json())
      .then(data => {
        // Set the form values with fetched data
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('username', data.username);
        setValue('email', data.email);
        setValue('address', data.address);
        setValue('mobile', data.mobile);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching User details:', error);
        setLoading(false);
      });
  }, [UserId, setValue]);


  const onSubmit = (data) => {
    const updatedUser = { firstName: data.firstName,lastName: data.lastName, username: data.username, email: data.email, address: data.address, mobile: data.mobile };
    console.log("Data to be sent:", updatedUser);
    fetch(`http://localhost:5000/api/update/${UserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    }).then(() => {
      navigate('/tables/basic-table');
      console.log("User updated");
    }).catch(error => {
      console.error('Error updating User:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
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
