import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';

const FeedData = [
  {
    title: 'Cras justo odio',
    icon: 'bi bi-bell',
    color: 'primary',
    date: '6 minute ago',
    id: 1,
  },
  {
    title: 'New user registered.',
    icon: 'bi bi-person',
    color: 'info',
    date: '6 minute ago',
    id: 2,
  },
  {
    title: 'Server #1 overloaded.',
    icon: 'bi bi-hdd',
    color: 'danger',
    date: '6 minute ago',
    id: 3,
  },
  {
    title: 'New order received.',
    icon: 'bi bi-bag-check',
    color: 'success',
    date: '6 minute ago',
    id: 4,
  },
  {
    title: 'Cras justo odio',
    icon: 'bi bi-bell',
    color: 'dark',
    date: '6 minute ago',
    id: 5,
  },
  {
    title: 'Server #1 overloaded.',
    icon: 'bi bi-hdd',
    color: 'warning',
    date: '6 minute ago',
    id: 6,
  },
];

const Feeds = () => {
  return (
    <Card className="w-100">
      <CardBody>
        <CardTitle tag="h4" className="mb-0">
          Feeds
        </CardTitle>
      </CardBody>
      <ListGroup flush>
        {FeedData.map((feed) => (
          <ListGroupItem
            key={feed.id}
            action
            href="/"
            tag="a"
            className="d-flex align-items-center py-3 px-4 border-0"
          >
            <Button className="rounded-circle d-flex align-items-center justify-content-center me-3 circle-sm" color={feed.color}>
              <i className={`fs-5 + ${feed.icon}`} />
            </Button>
            {feed.title}
            <small className="ms-auto text-muted text-small">{feed.date}</small>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
};

export default Feeds;
