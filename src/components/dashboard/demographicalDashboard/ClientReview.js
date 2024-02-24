import React from 'react';
import { Badge, Card, CardImg, CardImgOverlay } from 'reactstrap';

import bgImg from '../../../assets/images/background/img5.jpg';

const ClientReview = () => {
  return (
    <Card>
      <CardImg src={bgImg} height="360" />
      <CardImgOverlay className="d-flex align-items-center justify-content-center bg-opacity">
        <div className="text-center">
          <Badge color="info">Primary</Badge>
          <h4 className="fw-normal mx-5 lh-base mt-2 mb-0 text-white">
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </h4>
          <a href='/' className='text-decoration-none text-info mt-3'>Read More</a>
        </div>
      </CardImgOverlay>
    </Card>
  );
};

export default ClientReview;
