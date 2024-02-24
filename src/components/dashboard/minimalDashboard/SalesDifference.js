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
    curve: 'straight',
    width: 0,
  },
  colors: ['#fb9678','#01c0c8'],
  legend: {
    show: false,
  },
  markers: {
    show: false
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
    name: 'Site B',
    data: [50, 130, 80, 70, 180, 105, 250],
  },
  {
    name: 'Site A',
    data: [80, 100, 60, 200, 150, 100, 150],
  }
];

const SalesDifference = () => {
  return (
    <DashCard
      title="Sales Difference"
      actions={
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-cyan"></i>
            <span className='fs-6 text-muted'>Site A</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-record-fill fs-4 text-primary"></i>
            <span className='fs-6 text-muted'>Site B</span>
          </div>
        </div>
      }
    >
      <div>
        <Chart options={optionssalesummary} series={seriessalessummry} type="area" height="342" />
      </div>
    </DashCard>
  );
};

export default SalesDifference;
