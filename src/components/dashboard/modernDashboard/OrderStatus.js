import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import ProjectTables from '../extraDashboard/ProjectTable';

const OrderStatus = () => {
  return (
    <Card>
      <CardBody className='pb-0'>
        <CardTitle tag="h4">Order Status</CardTitle>
      </CardBody>
      <div>
        <ProjectTables />
      </div>
    </Card>
  );
};

export default OrderStatus;
