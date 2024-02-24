import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from 'reactstrap';

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
    <Card>
      <CardBody>
        <CardTitle tag="h4">Feeds</CardTitle>
        <CardSubtitle className="text-muted">
          Widget you can use
        </CardSubtitle>
      </CardBody>
      <ListGroup flush>
        {FeedData.map((feed) => (
          <ListGroupItem
            key={feed.id}
            action
            href="/"
            tag="a"
            className="d-flex align-items-center py-3 border-0"
          >
            <Button className="rounded-circle me-3" size="sm" color={feed.color}>
              <i className={feed.icon} />
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
