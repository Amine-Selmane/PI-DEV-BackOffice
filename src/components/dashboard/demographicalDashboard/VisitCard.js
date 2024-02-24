import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import * as Icon from 'react-feather';

// Visits
const optionsVisit = {
  chart: {
    id: 'basic-bar',
    type: 'bar',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#fb9678'],
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: 'flat',
      columnWidth: '20%',
    },
  },
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
const seriesVisit = [
  {
    name: 'Visit',
    data: [5, 6, 10, 9, 12, 4, 9, 12, 10, 9],
  },
];

// Page views
const optionsPageviews = {
  chart: {
    id: 'basic-bar',
    type: 'bar',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#01c0c8'],
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: 'flat',
      columnWidth: '20%',
    },
  },
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
const seriesPageviews = [
  {
    name: 'Page Views',
    data: [5, 6, 10, 9, 12, 4, 9, 12, 10, 9],
  },
];

// visitor
const optionsVisitor = {
  chart: {
    id: 'basic-bar',
    type: 'bar',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#ab8ce4'],
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: 'flat',
      columnWidth: '20%',
    },
  },
  fill: {
    colors: '#ab8ce4',
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
const seriesVisitor = [
  {
    name: 'Visitors',
    data: [5, 6, 10, 9, 12, 4, 9, 12, 10, 9],
  },
];

// bounce rate
const optionsBounce = {
  chart: {
    id: 'basic-bar',
    type: 'bar',
    fontFamily: '"Poppins", sans-serif',
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ['#fec107'],
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: 'flat',
      columnWidth: '20%',
    },
  },
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
const seriesBounce = [
  {
    name: 'Bounce Rate',
    data: [5, 6, 10, 9, 12, 4, 9, 12, 10, 9],
  },
];

// Site
const optionssite = {
  chart: {
    id: 'basic-bar',
    fontFamily: '"Poppins", sans-serif',
    type: 'area',
    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 0,
  },
  colors: ['#fb9678', '#01c0c8', '#8698b7'],
  fill: {
    opacity: 1,
  },
  legend: {
    show: false,
  },
  markers: {
    show: false,
  },
  xaxis: {
    categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016],
    labels: {
      show: true,
      style: {
        colors: '#99abb4',
        fontSize: '12px',
        fontFamily: "'Nunito Sans', sans-serif",
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        colors: '#99abb4',
        fontSize: '12px',
        fontFamily: "'Nunito Sans', sans-serif",
      },
    },
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    theme: 'dark',
  },
};
const seriessite = [
  {
    name: 'Site A',
    data: [0, 50, 20, 60, 30, 25, 10],
  },
  {
    name: 'Site B',
    data: [0, 15, 50, 12, 20, 80, 10],
  },
  {
    name: 'Site C',
    data: [0, 5, 65, 7, 120, 40, 10],
  },
];

const VisitCard = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg="3" md="6" className="text-center">
            <CardTitle tag="h6">Visit</CardTitle>
            <h2>
              <Icon.ArrowUp width={20} className="text-success me-2" />
              1064
            </h2>
            <div className="d-flex justify-content-center">
              <Chart
                options={optionsVisit}
                series={seriesVisit}
                type="bar"
                height="40"
                width="150"
              />
            </div>
          </Col>
          <Col lg="3" md="6" className="text-center mt-4 mt-md-0">
            <CardTitle tag="h6">Total Page Views</CardTitle>
            <h2>
              <Icon.ArrowDown width={20} className="text-danger me-2" />
              5064
            </h2>
            <div className="d-flex justify-content-center">
              <Chart
                options={optionsPageviews}
                series={seriesPageviews}
                type="bar"
                height="40"
                width="150"
              />
            </div>
          </Col>
          <Col lg="3" md="6" className="text-center mt-4 mt-lg-0">
            <CardTitle tag="h6">Unique Visitor</CardTitle>
            <h2>
              <Icon.ArrowDown width={20} className="text-danger me-2" />
              664
            </h2>
            <div className="d-flex justify-content-center">
              <Chart
                options={optionsVisitor}
                series={seriesVisitor}
                type="bar"
                height="40"
                width="150"
              />
            </div>
          </Col>
          <Col lg="3" md="6" className="text-center mt-4 mt-lg-0">
            <CardTitle tag="h6">Bounce Rate</CardTitle>
            <h2>
              <Icon.ArrowUp width={20} className="text-success me-2" />
              50%
            </h2>
            <div className="d-flex justify-content-center">
              <Chart
                options={optionsBounce}
                series={seriesBounce}
                type="bar"
                height="40"
                width="150"
              />
            </div>
          </Col>
        </Row>
        <div className="d-flex align-items-center justify-content-center mt-4 gap-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-cyan"></i>
            <span className="fs-6 text-muted">Site A</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-primary"></i>
            <span className="fs-6 text-muted">Site B</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-purple"></i>
            <span className="fs-6 text-muted">Site C</span>
          </div>
        </div>
        <div>
          <Chart options={optionssite} series={seriessite} type="area" height="340" />
        </div>
      </CardBody>
    </Card>
  );
};

export default VisitCard;
