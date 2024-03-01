import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import Iframe from 'react-iframe';
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
  const [activeTab, setActiveTab] = useState('1');
  const [userData, setUserData] = useState(null);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
                <CardTitle tag="h4">+91 654 784 547</CardTitle>

                <CardSubtitle className="text-muted fs-5 mt-3">Address</CardSubtitle>
                <CardTitle tag="h4">71 Pilgrim Avenue Chevy Chase, MD 20815</CardTitle>
                <div>
                  <Iframe
                    className="position-relative"
                    url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508"
                    width="280"
                    height="150"
                    frameborder="0"
                    allowfullscreen
                  />
                </div>
               
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
                      <Form>
                        <FormGroup>
                          <Label>Full Name</Label>
                          <Input type="text" placeholder="Shaina Agrawal" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input type="email" placeholder="Jognsmith@cool.com" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Password</Label>
                          <Input type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Phone No</Label>
                          <Input type="text" placeholder="123 456 1020" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Message</Label>
                          <Input type="textarea" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Select Country</Label>
                          <Input type="select">
                            <option>USA</option>
                            <option>India</option>
                            <option>America</option>
                          </Input>
                        </FormGroup>
                        <Button color="primary">Update Profile</Button>
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
