import React from 'react';
import { Row, Col } from 'reactstrap';

import RecentComments from '../../components/dashboard/minimalDashboard/RecentComments';
import TodoList from '../../components/dashboard/minimalDashboard/TodoList';
import Chat from '../../components/dashboard/minimalDashboard/Chat';
import FollowerCard from '../../components/dashboard/analyticalDashboard/FollowerCard';
import Feeds from '../../components/dashboard/modernDashboard/Feeds';
import Messages from '../../components/dashboard/minimalDashboard/Messages';
import BrowserStats from '../../components/dashboard/analyticalDashboard/BrowserStats';
import WeatherCard from '../../components/dashboard/modernDashboard/WeatherCard';

const Widgets = () => {
  return (
    <>
      <Row>
        <Col xs="12" lg="4">
          <RecentComments />
          <TodoList />
          <BrowserStats />
        </Col>
        <Col xs="12" lg="4">
          <Chat />
          <FollowerCard />
          <WeatherCard />
        </Col>
        <Col xs="12" lg="4">
          <Feeds />
          <Messages />
        </Col>
      </Row>
    </>
  );
};

export default Widgets;
