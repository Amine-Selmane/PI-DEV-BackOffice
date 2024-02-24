import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import Chart from 'react-apexcharts';

const BounceSales = () => {
    const optionsvisit = {
        chart: {
          id: 'donut-chart',
          fontFamily: '"Nunito", sans-serif',
          height: 100
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
        colors: ["#fb9678", "#01c0c8", "#f1f2f7"],
        tooltip: {
          fillSeriesColor: false,
        },
      };
      const seriesvisit = [20, 40, 30];
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Bounce Sales</CardTitle>
        <Row className="mt-4 pt-3">
          <Col xs="7" xxl="8">
            <h2 className="fs-h1 text-primary">$647</h2>
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

export default BounceSales;
