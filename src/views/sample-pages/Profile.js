import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { format } from 'date-fns';

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';


import img1 from '../../assets/images/users/user4.jpg';


const Profile = () => {
  const [activeTab, setActiveTab] = useState('3');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/userToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'msg') { // Assuming 'msg' is the name of the date input field
      // Format the date value to 'yyyy-MM-dd'
      const formattedDate = value.split('T')[0];
      setUserData(prevState => ({
        ...prevState,
        dateNaiss: formattedDate
      }));
    } else {
      setUserData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.put('http://localhost:5000/api/updateuser', userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profil utilisateur mis à jour avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
    }
  };

  return (
    <>
      {userData && (
      <Row>
        <Col xs="12" md="12" lg="4">
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-4">
                <img src={userData.profile || img1} className="rounded-circle" width="150" alt="" />
                <CardTitle tag="h4" className="mt-2 mb-0">
                  {userData.firstName} {userData.lastName}
                </CardTitle>
                <CardSubtitle className="text-muted">{userData.role}</CardSubtitle>
               
              </div>
            </CardBody>
            <CardBody className="border-top p-4">
              <div>
                <CardSubtitle className="text-muted fs-5">Email address</CardSubtitle>
                <CardTitle tag="h4">{userData.email}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Phone</CardSubtitle>
                <CardTitle tag="h4">{userData.mobile}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Address</CardSubtitle>
                <CardTitle tag="h4">{userData.address}</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Birth Date</CardSubtitle>
<CardTitle tag="h4">{userData.dateNaiss ? format(new Date(userData.dateNaiss), 'dd/MM/yyyy') : ''}</CardTitle>


               
               
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="12" lg="8">
          <Card>
          <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '3' ? 'active bg-transparent' : 'cursor-pointer'}
            onClick={() => {
              toggle('3');
            }}
          >
            Setting
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <div className="p-4">
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Label>First Name</Label>
                            <Input type="text" name="firstName" placeholder="Shaina Agrawal" value={userData.firstName} onChange={handleInputChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Last Name</Label>
                            <Input type="text" name="lastName" placeholder="Shaina Agrawal" value={userData.lastName} onChange={handleInputChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Email</Label>
                            <Input type="email" name="email" placeholder="Jognsmith@cool.com" value={userData.email} onChange={handleInputChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Phone No</Label>
                            <Input type="text" name="mobile" placeholder="123 456 1020" value={userData.mobile} onChange={handleInputChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Address</Label>
                            <Input type="textarea" name="address" value={userData.address} onChange={handleInputChange} />
                          </FormGroup>
                          <FormGroup>
                          <Label>Date of Birth</Label>
                          <Input type="date" name="dateNaiss" value={userData.dateNaiss} onChange={handleInputChange} />
                        </FormGroup>
                          <Button color="primary" type="submit">Update Profile</Button>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>

          </Card>
        </Col>
      </Row>
      )}
    </>
  );
};

export default Profile;
