import { Row, Col } from 'reactstrap';
import BrowserStats from '../../components/dashboard/analyticalDashboard/BrowserStats';
import CpuLoad from '../../components/dashboard/analyticalDashboard/CpuLoad';
import FollowerCard from '../../components/dashboard/analyticalDashboard/FollowerCard';
import SiteVisits from '../../components/dashboard/analyticalDashboard/SiteVisits';
import TrafficCards from '../../components/dashboard/analyticalDashboard/TrafficCards';

const Analytical = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <TrafficCards />
        </Col>
        <Col lg="12">
          <SiteVisits />
        </Col>
        <Col lg="4">
          <BrowserStats />
        </Col>
        <Col lg="4">
          <CpuLoad />
        </Col>
        <Col lg="4">
          <FollowerCard />
        </Col>
      </Row>
     
    </>
  );
};

export default Analytical;
