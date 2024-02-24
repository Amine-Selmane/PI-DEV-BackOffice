import { Row, Col } from 'reactstrap';
import Feeds from '../../components/dashboard/modernDashboard/Feeds';
import FollowCard from '../../components/dashboard/modernDashboard/FollowCard';
import MonthlyTarget from '../../components/dashboard/modernDashboard/MonthlyTarget';
import OrderStatus from '../../components/dashboard/modernDashboard/OrderStatus';
import RatingCard from '../../components/dashboard/modernDashboard/RatingCard';
// import Sales2022 from '../../components/dashboard/modernDashboard/Sales2022';
import UserActivity from '../../components/dashboard/modernDashboard/UserActivity';
import WeatherCard from '../../components/dashboard/modernDashboard/WeatherCard';
import WeeklyTarget from '../../components/dashboard/modernDashboard/WeeklyTarget';

const Modern = () => {
  return (
    <>
      {/*********************Sales Overview ************************/}
      <Row>
        <Col lg="12">
          <RatingCard />
        </Col>
        <Col lg="4">
          <WeeklyTarget />
        </Col>
        <Col lg="4">
          <MonthlyTarget />
        </Col>
        <Col lg="4">
          <FollowCard />
        </Col>
        <Col lg="4" className='d-flex align-items-stretch'>
            <WeatherCard />
        </Col>
        <Col lg="4" className='d-flex align-items-stretch'>
            <UserActivity />
        </Col>
        <Col lg="4" className='d-flex align-items-stretch'>
            <Feeds />
        </Col>    
        <Col lg="12">
            <OrderStatus />
        </Col>    
      </Row>
     
    </>
  );
};

export default Modern;
