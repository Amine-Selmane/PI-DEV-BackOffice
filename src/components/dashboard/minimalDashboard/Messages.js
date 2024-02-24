import {
  Card,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import SimpleBar from 'simplebar-react';
import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';
import user5 from '../../../assets/images/users/user5.jpg';

const messages = [
  {
    id: 1,
    image: user1,
    status: 'online',
    title: 'Event Today',
    desc: 'Just a reminder of the event.',
    time: '9:10 PM',
  },
  {
    id: 2,
    image: user2,
    status: 'busy',
    title: 'Send Email',
    desc: 'Just send my admin!',
    time: '9:02 AM',
  },
  {
    id: 3,
    image: user3,
    status: 'away',
    title: 'Check Email',
    desc: 'Just check emails for today.',
    time: '9:02 AM',
  },
  {
    id: 4,
    image: user4,
    status: 'offline',
    title: 'Settings',
    desc: 'You can customize this template as you want.',
    time: '9:08 AM',
  },
  {
    id: 5,
    image: user5,
    status: 'busy',
    title: 'Send Email',
    desc: 'Just send my admin!',
    time: '9:02 AM',
  },
  {
    id: 6,
    image: user1,
    status: 'online',
    title: 'Event Today',
    desc: 'Just a reminder of the event.',
    time: '9:10 PM',
  },
];

const Messages = () => {
  return (
    <Card className='w-100'>
      <div className='p-4'>
        <CardTitle tag="h4">You have 5 new messages</CardTitle>
      </div>
      <SimpleBar style={{ height: '460px' }}>
        <ListGroup flush>
          {messages.map((msg) => (
            <ListGroupItem className='px-4' action key={msg.id} tag="a" href="/">
              <div className="d-flex align-items-center gap-3 py-2">
                <img
                  src={msg.image}
                  alt="user"
                  className="rounded-circle flex-shrink-0"
                  width="45"
                />
                <div className="col-9">
                  <ListGroupItemHeading className="fw-medium mb-0">{msg.title}</ListGroupItemHeading>
                  <ListGroupItemText className="text-muted text-truncate mb-0 d-block">{msg.desc}</ListGroupItemText>
                  <small className="text-muted">{msg.time}</small>
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </SimpleBar>
    </Card>
  );
};

export default Messages;
