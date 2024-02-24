import React from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
// import { Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import DashCard from '../dashboardCards/DashCard';

import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';

const UserActivity = () => {
  return (
    <div className="w-100 h-100">
      <DashCard title="User Activity">
        <div className="steamline mt-5">
          <div className="sl-item">
            <div className="sl-left bg-success">
              <Icon.User width={20} />
            </div>
            <div className="sl-right">
              <div className="font-medium">
                Meeting today <span className="sl-date"> 5pm</span>
              </div>
              <div className="desc">you can write anything</div>
            </div>
          </div>
          <div className="sl-item">
            <div className="sl-left bg-info">
              <Icon.Image width={20} />
            </div>
            <div className="sl-right">
              <div className="font-medium">Send documents to Clark</div>
              <div className="desc">Lorem Ipsum is simply</div>
            </div>
          </div>
          <div className="sl-item">
            <div className="sl-left">
              <img className="rounded-circle" alt="user" src={user1} />
            </div>
            <div className="sl-right">
              <div className="font-medium">
                Go to the Doctor
                <span className="sl-date">5 minutes ago</span>
              </div>
              <div className="desc">Contrary to popular belief</div>
            </div>
          </div>
          <div className="sl-item mb-0">
            <div className="sl-left">
              <img className="rounded-circle" alt="user" src={user2} />
            </div>
            <div className="sl-right">
              <div>
                <a href="/">Tiger Sroff</a>
                <span className="sl-date">5 minutes ago</span>
              </div>
              <div className="desc">
                Approve meeting with tiger{' '}
                <div className="mt-4">
                  <Button color="success" className="me-2" outline>
                    Apporve
                  </Button>
                  <Button color="danger" outline>
                    Refuse
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashCard>
    </div>
  );
};

export default UserActivity;
