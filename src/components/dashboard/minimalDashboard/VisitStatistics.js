import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import Chart from 'react-apexcharts';

const VisitStatistics = () => {
  const optionsvisit = {
    chart: {
      id: 'donut-chart',
      fontFamily: '"Nunito", sans-serif',
      height: 100,
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
    colors: ['#01c0c8', '#7d5ab6', '#ffffff'],
    tooltip: {
      fillSeriesColor: false,
    },
    responsive: [
      {
        breakpoint: 1500,
        options: {
          height: 60
        }
      },
    ]
  };
  const seriesvisit = [20, 40, 30];
  return (
    <Card className="bg-purple text-white">
      <CardBody>
        <CardTitle tag="h4">Visit Statistics</CardTitle>
        <Row className="mt-4 pt-3">
          <Col xs="7" xxl="8">
            <h2 className="fs-h1">$347</h2>
            <p className="op-5">APRIL 2022</p>
            <span className="fw-medium">(150 Sales)</span>
          </Col>
          <Col xs="5" xxl="4">
            <Chart options={optionsvisit} series={seriesvisit} type="pie" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default VisitStatistics;
