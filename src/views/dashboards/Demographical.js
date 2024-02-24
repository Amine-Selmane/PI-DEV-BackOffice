import { Row, Col } from 'reactstrap';
import BounceSales from '../../components/dashboard/demographicalDashboard/BounceSales';
import ClientReview from '../../components/dashboard/demographicalDashboard/ClientReview';
import CounterCard from '../../components/dashboard/demographicalDashboard/CounterCard';
import VisitCard from '../../components/dashboard/demographicalDashboard/VisitCard';
import VisitStatistics from '../../components/dashboard/demographicalDashboard/VisitStatistics';
import SalesDifference from '../../components/dashboard/minimalDashboard/SalesDifference';

const Demographical = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <VisitCard />
        </Col>
        <Col lg="6">
            <CounterCard />
        </Col>
        <Col lg="6">
            <ClientReview />
        </Col>
        <Col lg="8">
            <SalesDifference />
        </Col>
        <Col lg="4">
        <BounceSales />
            <VisitStatistics />            
        </Col>
      </Row>
     
    </>
  );
};

export default Demographical;
