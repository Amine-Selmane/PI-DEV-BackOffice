import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const optionssalesummary = {
  chart: {
    id: 'basic-bar',
    fontFamily: '"Poppins", sans-serif',
    type: 'line',
    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  colors: ['#01c0c8', '#fb9678', '#ab8ce4'],
  fill: {
    opacity: 1
  },
  legend: {
    show: false,
  },
  markers: {
    size: 2,
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
const seriessalessummry = [
  {
    name: 'Iphone',
    data: [50, 130, 80, 70, 180, 105, 250],
  },
  {
    name: 'Ipad',
    data: [80, 100, 60, 200, 150, 100, 150],
  },
  {
    name: 'Iwatch',
    data: [20, 80, 70, 140, 140, 80, 200],
  },
];

const YearlySales = () => {
  return (
    <DashCard
      title="Yearly Sales"
      actions={
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-cyan"></i>
            <span className='fs-6 text-muted'>Iphone</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-primary"></i>
            <span className='fs-6 text-muted'>Ipad</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-purple"></i>
            <span className='fs-6 text-muted'>Iwatch</span>
          </div>
        </div>
      }
    >
      <div>
        <Chart options={optionssalesummary} series={seriessalessummry} type="line" height="348" />
      </div>
    </DashCard>
  );
};

export default YearlySales;
