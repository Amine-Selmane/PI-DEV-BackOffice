import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import * as Icon from 'react-feather';
import DashCard from '../dashboardCards/DashCard';

import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';

const Chat = () => {
  const [chats, setChats] = useState([
    {
      username: 'Kevin Hsu',
      content: 'Lorem Ipsum is simply dummy text of the printing & type setting industry.',
      img: user1,
      id: 1,
    },
    {
      username: 'Alice Chen',
      content: 'It’s Great opportunity to work.',
      img: user1,
      id: 2,
    },
    {
      username: 'Kevin Hsu',
      content: 'I would love to join the team.',
      img: user1,
      id: 3,
    },
    {
      username: 'KevHs',
      content: 'Whats budget of the new project.',
      img: user2,
      id: 4,
    },
    {
      username: 'Alice Chen',
      content: 'Well we have good budget for the project',
      img: user1,
      id: 5,
    },
    {
      username: 'Kevin Hsu',
      content: 'Lorem Ipsum is simply dummy text of the printing.',
      img: user2,
      id: 6,
    },
    {
      username: 'Alice Chen',
      content: 'Lorem Ipsum is simply dummy text.',
      img: user1,
      id: 7,
    },
  ]);

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const message2 = e.target.value;
    setMessage(message2);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    setChats(
      [
        ...chats,
        {
          username: 'Kevin Hsu',
          content: <span>{message}</span>,
          img: user2,
          id: chats.length + 1,
        },
      ],
      setMessage(''),
    );
  };
  const username = 'Kevin Hsu';

  return (
    <div className="w-100">
      <DashCard title="Chat">
        <ul className="list-unstyled">
          <SimpleBar style={{ height: '420px' }}>
            {chats.map((chat) => (
              <li
                className={`chat ${
                  username === chat.username
                    ? 'd-flex flex-row-reverse text-end mt-2'
                    : 'd-flex gap-3 ms-auto mt-2'
                }`}
                key={chat.id}
              >
                <div>
                  {username !== chat.username && (
                    <img
                      src={chat.img}
                      alt={`${chat.username}'s profile pic`}
                      width="45"
                      className="rounded-circle"
                    />
                  )}
                </div>
                <div
                  className={`p-2 mb-1 rounded ${
                    username === chat.username ? 'bg-light-primary' : 'bg-light'
                  }`}
                >
                  {' '}
                  {chat.content}
                </div>
              </li>
            ))}
          </SimpleBar>
        </ul>
        <div className="border-top pt-4">
          <Form onSubmit={(e) => submitMessage(e)}>
            <Row className="gx-0">
              <Col xs="10">
                <div className="input-field mt-0 mb-0">
                  <Input
                    type="text"
                    placeholder="Type and enter"
                    className="form-control border-0"
                    value={message}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col xs="2" className="text-end">
                <Button color="info" type="submit" value="submit">
                  <Icon.Send width={18} />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </DashCard>
    </div>
  );
};

export default Chat;
