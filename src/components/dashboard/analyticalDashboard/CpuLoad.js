import React from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

// Site A Traffic
const optionscpu = {
  chart: {
    id: 'basic-bar',
    type: 'bar',
    fontFamily: '"Poppins", sans-serif',
    foreColor: '#adb0bb',
    height: 400,
    toolbar: {
      show: false,
    },
    sparkline: {
        enabled: true
    }
  },
  colors: ['#01c0c8', '#fa896b'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: ['40%'],
      borderRadius: 7,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false,
      },
    },
    padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },  
  },
  xaxis: {
    show: false
  },
  yaxis: {
    show: false
  },
  tooltip: {
    theme: 'dark',
  },
};
const seriescpu = [
  {
    name: 'Usage',
    data: [1.5, 2.7, 2.2, 3.6, 1.5],
  },
  {
    name: 'Space',
    data: [1.8, 1.1, 2.5, 1.5, 0.6],
  },
];

const CpuLoad = () => {
  return (
    <DashCard title="CPU Load">
      <Row className="mt-4">
        <Col xs="4" md="3" className="border-end">
          <h6 className="mb-1 text-muted">Usage</h6>
          <span className="fw-medium">60GB</span>
        </Col>
        <Col xs="4" md="3" className="border-end">
          <h6 className="mb-1 text-muted">Space</h6>
          <span className="fw-medium">320GB</span>
        </Col>
        <Col xs="4" md="3">
          <h6 className="mb-1 text-muted">CPU</h6>
          <span className="fw-medium">50%</span>
        </Col>
      </Row>
      <Chart options={optionscpu} series={seriescpu} type="bar" height="320" />
    </DashCard>
  );
};

export default CpuLoad;
