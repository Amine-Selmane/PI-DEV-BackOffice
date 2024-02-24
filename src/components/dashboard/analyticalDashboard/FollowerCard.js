import React from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, Col, Row } from 'reactstrap';

import bgImg from '../../../assets/images/background/profile-bg.jpg';
import userImg from '../../../assets/images/users/user4.jpg';

const FollowerCard = () => {
  return (
    <Card>
      <CardImg src={bgImg} height="360" />
      <CardImgOverlay className="d-flex align-items-center justify-content-center bg-opacity">
        <div className="text-center">
          <img src={userImg} className="rounded-circle" width="90" alt="user" />
          <h4 className="fw-medium mt-3 mb-0 text-white">John Deo</h4>
          <h6 className="fw-normal text-white op-5">Wed Designer</h6>
        </div>
      </CardImgOverlay>
      <CardBody>
        <Row>
          <Col xs="4" className='text-center'>
            <h4 className='fw-medium'>12K</h4>
            <h6 className="mb-0 text-muted">Followers</h6>
          </Col>
          <Col xs="4" className='text-center'>
            <h4 className='fw-medium'>420</h4>
            <h6 className="mb-0 text-muted">Following</h6>
          </Col>
          <Col xs="4" className='text-center'>
            <h4 className='fw-medium'>128</h4>
            <h6 className="mb-0 text-muted">Comments</h6>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default FollowerCard;
