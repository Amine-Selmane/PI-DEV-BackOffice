import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Badge
} from 'reactstrap';
import DashCard from '../dashboardCards/DashCard';

import b1 from "../../../assets/images/browser/chrome-logo.png";
import b2 from "../../../assets/images/browser/firefox-logo.png";
import b3 from "../../../assets/images/browser/safari-logo.png";
import b4 from "../../../assets/images/browser/edge-logo.png";
import b5 from "../../../assets/images/browser/opera-logo.png";

const FeedData = [
  {
    title: 'Google Chrome',
    img: b1,
    color: "info",
    percent: "20",
    id: 1,
  },
  {
    title: 'Mozila Firefox',
    img: b2,
    color: "success",
    percent: "23",
    id: 2,
  },
  {
    title: 'Apple Safari',
    img: b3,
    color: "primary",
    percent: "45",
    id: 3,
  },
  {
    title: 'Internet Explorer',
    img: b4,
    color: "warning",
    percent: "78",
    id: 4,
  },
  {
    title: 'Opera mini',
    img: b5,
    color: "danger",
    percent: "65",
    id: 5,
  },
  {
    title: 'Microsoft edge',
    img: b4,
    color: "cyan",
    percent: "10",
    id: 6,
  },
];

const BrowserStats = () => {
  return (
    <DashCard title="Browser Stats">
      <ListGroup flush>
        {FeedData.map((feed) => (
          <ListGroupItem
            key={feed.id}
            action
            href="/"
            tag="a"
            className="d-flex align-items-center py-3 border-0"
          >
            <img src={feed.img} alt="browser" className='rounded-circle' />
            <p className='ms-3 mb-0'>{feed.title}</p>
            <Badge className="rounded-pill ms-auto" color={feed.color}>{feed.percent}%</Badge>
          </ListGroupItem>
        ))}
      </ListGroup>
    </DashCard>
  );
};

export default BrowserStats;
