import React from 'react';

import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import Chart from 'react-apexcharts';

// Site A Traffic
const optionsSiteA = {
  chart: {
    id: 'basic-bar',
    type: 'line',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#fb9678'],
  fill: {
    colors: '#fb9678',
    opacity: 1,
    type: 'solid',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 1,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  tooltip: {
    theme: 'dark',
  },
};
const seriesSiteA = [
  {
    name: 'Site A',
    data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
  },
];

// Site B Traffic
const optionsSiteB = {
  chart: {
    id: 'basic-bar',
    type: 'line',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#01c0c8'],
  fill: {
    colors: '#01c0c8',
    opacity: 1,
    type: 'solid',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 1,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  tooltip: {
    theme: 'dark',
  },
};
const seriesSiteB = [
  {
    name: 'Site B',
    data: [0, 2, 8, 6, 8, 5, 6, 4, 8, 6, 6, 2],
  },
];

// Site C Traffic
const optionsSiteC = {
  chart: {
    id: 'basic-bar',
    type: 'line',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#fec107'],
  fill: {
    colors: '#fec107',
    opacity: 1,
    type: 'solid',
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 1,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  tooltip: {
    theme: 'dark',
  },
};
const seriesSiteC = [
  {
    name: 'Site C',
    data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
  },
];

const TrafficCards = () => {
  return (
    <Row>
      <Col lg="4">
        <Card>
          <CardBody>
            <CardTitle tag="h4">Site A Traffic</CardTitle>
            <Row className="mt-4">
              <Col xs="4" md="3" className="border-end">
                <h6 className="mb-1 text-muted">Growth</h6>
                <span className="fw-medium">80.40%</span>
              </Col>
              <Col xs="4" md="3" className="border-end">
                <h6 className="mb-1 text-muted">Montly</h6>
                <span className="fw-medium">20.40%</span>
              </Col>
              <Col xs="4" md="3">
                <h6 className="mb-1 text-muted">Daily</h6>
                <span className="fw-medium">5.40%</span>
              </Col>
            </Row>
          </CardBody>
          <Chart options={optionsSiteA} series={seriesSiteA} type="area" height="50" />
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardBody>
            <CardTitle tag="h4">Site B Traffic</CardTitle>
            <Row className="mt-4">
              <Col xs="4" md="3" className="border-end">
                <h6 className="mb-1 text-muted">Growth</h6>
                <span className="fw-medium">80.40%</span>
              </Col>
              <Col xs="4" md="3" className="border-end">
                <h6 className="mb-1 text-muted">Montly</h6>
                <span className="fw-medium">20.40%</span>
              </Col>
              <Col xs="4" md="3">
                <h6 className="mb-1 text-muted">Daily</h6>
                <span className="fw-medium">5.40%</span>
              </Col>
            </Row>
          </CardBody>
          <Chart options={optionsSiteB} series={seriesSiteB} type="area" height="50" />
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardBody>
            <CardTitle tag="h4">Site C Traffic</CardTitle>
            <Row className="mt-4">
              <Col xs="4" md="3" className="border-end">
                <h6 className="mb-1 text-muted">Growth</h6>
                <span className="fw-medium">80.40%</span>
              </Col>
              <Col xs="4" md="3" className="border-end">
                <h6 className="mb-1 text-muted">Montly</h6>
                <span className="fw-medium">20.40%</span>
              </Col>
              <Col xs="4" md="3">
                <h6 className="mb-1 text-muted">Daily</h6>
                <span className="fw-medium">5.40%</span>
              </Col>
            </Row>
          </CardBody>
          <Chart options={optionsSiteC} series={seriesSiteC} type="area" height="50" />
        </Card>
      </Col>
    </Row>
  );
};

export default TrafficCards;
