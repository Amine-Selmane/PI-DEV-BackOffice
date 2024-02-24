import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import * as Icon from 'react-feather';

const WeatherCard = () => {
  return (
    <Card className='w-100'>
      <CardBody>
        <CardTitle tag="h4">Weather</CardTitle>
      </CardBody>
      <CardBody className="bg-light">
        <div className="d-flex align-items-center">
          <span>
            <h2 className="mb-1">Monday</h2>
            <span className="text-muted">7th May 2017</span>
          </span>
          <div className="ms-auto d-flex align-items-center">
            <Icon.CloudDrizzle width={32} height={32} className="text-primary me-2" />
            <div className="display-6 mt-2">
              32<sup>°F</sup>
            </div>
          </div>
        </div>
      </CardBody>
      <CardBody>
        <Row>
          <Col md="6">
            <Row className="pb-2">
              <Col xs="6">
                <span className="text-muted">Wind</span>
              </Col>
              <Col xs="6" className="text-truncate">
                <span className="fw-medium w-100">ESE 17 mph</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs="6">
                <span className="text-muted text-nowrap">Humidity</span>
              </Col>
              <Col xs="6" className="text-truncate">
                <span className="fw-medium w-100">83%</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs="6">
                <span className="text-muted text-nowrap">Pressure</span>
              </Col>
              <Col xs="6" className="text-truncate">
                <span className="fw-medium w-100">28.56 in</span>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <Row className="pb-2">
              <Col xs="6" className="text-truncate">
                <span className="text-muted w-100">Cloud Cover</span>
              </Col>
              <Col xs="6" className="text-truncate">
                <span className="fw-medium w-100">78%</span>
              </Col>
            </Row>
            <Row className="py-2">
              <Col xs="6" className="text-truncate">
                <span className="text-muted w-100">Ceiling</span>
              </Col>
              <Col xs="6" className="text-truncate">
                <span className="fw-medium w-100">25760 ft</span>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className='mt-4 pt-3'>
            <Col xs="4" md="2" className='text-center'>
                <h5 className="text-muted">Tue</h5>
                <div className='my-3'>
                    <Icon.CloudDrizzle width={20} className="text-info" />
                </div>
                <h4 className="text-nowrap fw-medium mb-0">31<sup>°F</sup></h4>
            </Col>
            <Col xs="4" md="2" className='text-center'>
                <h5 className="text-muted text-nowrap">Wed</h5>
                <div className='my-3'>
                    <Icon.Cloud width={20} className="text-info" />
                </div>
                <h4 className="text-nowrap fw-medium mb-0">34<sup>°F</sup></h4>
            </Col>
            <Col xs="4" md="2" className='text-center'>
                <h5 className="text-muted">Thu</h5>
                <div className='my-3'>
                    <Icon.CloudLightning width={20} className="text-info" />
                </div>
                <h4 className="text-nowrap fw-medium mb-0">12<sup>°F</sup></h4>
            </Col>
            <Col xs="4" md="2" className='text-center mt-4 mt-md-0'>
                <h5 className="text-muted">Fri</h5>
                <div className='my-3'>
                    <Icon.CloudRain width={20} className="text-info" />
                </div>
                <h4 className="text-nowrap fw-medium mb-0">20<sup>°F</sup></h4>
            </Col>
            <Col xs="4" md="2" className='text-center mt-4 mt-md-0'>
                <h5 className="text-muted">Sat</h5>
                <div className='my-3'>
                    <Icon.CloudSnow width={20} className="text-info" />
                </div>
                <h4 className="text-nowrap fw-medium mb-0">21<sup>°F</sup></h4>
            </Col>
            <Col xs="4" md="2" className='text-center mt-4 mt-md-0'>
                <h5 className="text-muted">Sun</h5>
                <div className='my-3'>
                    <Icon.CloudDrizzle width={20} className="text-info" />
                </div>
                <h4 className="text-nowrap fw-medium mb-0">23<sup>°F</sup></h4>
            </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WeatherCard;
