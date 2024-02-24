import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
// import * as Icon from 'react-feather';
import Chart from 'react-apexcharts';

const MonthlyTarget = () => {
  const optionsvisit = {
    chart: {
      id: 'donut-chart',
      fontFamily: '"Poppins", sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    colors: ['#fb9678', '#f1f1f1'],
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: '90',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 5
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              fontSize: '13px',
              color: '#fff',
              label: '25%',
            },
          },
        },
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriesvisit = [25, 40];
  return (
    <Card className="w-100 bg-cyan text-white">
      <CardBody>
        <Row>
          <Col md="7" className="d-flex align-items-center">
            <div>
              <CardTitle tag="h5">Monthly Target</CardTitle>
              <span className="op-5">25% achived</span>
            </div>
          </Col>
          <Col md="5">
            <Chart options={optionsvisit} series={seriesvisit} type="donut" height={80} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default MonthlyTarget;
