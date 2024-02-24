import { Col, Row } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const VisitStatistics = () => {
  const optionsales = {
    chart: {
      id: 'total-visits',
      fontFamily: '"Nunito", sans-serif',
      type: 'bar',
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: ['#03a9f3'],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
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
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
  };
  const seriesales = [
    {
      name: 'Total Visits',
      data: [6, 10, 9, 11, 9, 10, 12],
    },
  ];
  return (
    <DashCard title="Visit Statistics">
      <Row className='mt-4 pt-3'>
        <Col xs="6">
          <h2 className="text-info fs-h1">$347</h2>
          <p className="text-muted">APRIL 2022</p>
          <span className="fw-medium">(150 Sales)</span>
        </Col>
        <Col xs="6">
          <Chart options={optionsales} series={seriesales} type="bar" height="100" />
        </Col>
      </Row>
    </DashCard>
  );
};

export default VisitStatistics;
