import React from 'react';
import { Col, Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import * as Icon from 'react-feather';
import DashCard from '../dashboardCards/DashCard';

// Site A Traffic
const optionsSiteA = {
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
      columnWidth: '30%',
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
const seriesSiteA = [
  {
    name: 'Total Visit',
    data: [0, 5, 6, 10, 9, 12, 4, 9],
  },
];

// Site B Traffic
const optionsSiteB = {
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
      columnWidth: '30%',
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
const seriesSiteB = [
  {
    name: 'Total Page Views',
    data: [0, 5, 6, 10, 9, 12, 4, 9],
  },
];

// Site C Traffic
const optionsSiteC = {
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
      columnWidth: '30%',
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
const seriesSiteC = [
  {
    name: 'Unique Visitor',
    data: [0, 5, 6, 10, 9, 12, 4, 9],
  },
];

// Site D Traffic
const optionsSiteD = {
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
        columnWidth: '30%',
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
  const seriesSiteD = [
    {
      name: 'Bounce Rate',
      data: [0, 5, 6, 10, 9, 12, 4, 9],
    },
  ];

const RatingCard = () => {
  return (
    <Row>
      <Col lg="3" md="6">
        <DashCard title="Total Visit">
          <Row>
            <Col xs="6">
              <Chart
                options={optionsSiteA}
                series={seriesSiteA}
                type="bar"
                height={40}
                width={80}
              />
            </Col>
            <Col xs="6" className='text-end'>
              <h3>
                <Icon.ArrowUp width={18} className="text-success" /> 8659
              </h3>
            </Col>
          </Row>
        </DashCard>
      </Col>
      <Col lg="3" md="6">
        <DashCard title="Total Page Views">
        <Row>
            <Col xs="6">
              <Chart
                options={optionsSiteB}
                series={seriesSiteB}
                type="bar"
                height={40}
                width={80}
              />
            </Col>
            <Col xs="6" className='text-end'>
              <h3>
                <Icon.ArrowDown width={18} className="text-danger" /> 7469
              </h3>
            </Col>
          </Row>
        </DashCard>
      </Col>
      <Col lg="3" md="6">
        <DashCard title="Unique Visitor">
        <Row>
            <Col xs="6">
              <Chart
                options={optionsSiteC}
                series={seriesSiteC}
                type="bar"
                height={40}
                width={80}
              />
            </Col>
            <Col xs="6" className='text-end'>
              <h3>
                <Icon.ArrowUp width={18} className="text-success" /> 6011
              </h3>
            </Col>
          </Row>
        </DashCard>
      </Col>
      <Col lg="3" md="6">
        <DashCard title="Bounce Rate">
        <Row>
            <Col xs="6">
              <Chart
                options={optionsSiteD}
                series={seriesSiteD}
                type="bar"
                height={40}
                width={80}
              />
            </Col>
            <Col xs="6" className='text-end'>
              <h3>
                <Icon.ArrowDown width={18} className="text-danger" /> 18%
              </h3>
            </Col>
          </Row>
        </DashCard>
      </Col>
    </Row>
  );
};

export default RatingCard;
