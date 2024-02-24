import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';

const FollowCard = () => {
  return (
    <Card className="w-100">
      <CardBody>
        <div className="d-flex align-items-center">
          <img src={user1} alt="user" width={50} className="rounded" />
          <div className="ms-3">
            <CardTitle tag="h5" className='mb-0'>John Deo</CardTitle>
            <span className="text-muted fs-7">Web Designer</span>
          </div>
          <div className='ms-auto'>
            <Button color='cyan'>Follow</Button>
          </div>
        </div>
        <div className='d-flex justify-content-end mt-2 pt-1'>
            <a href='/'>
                <img src={user2} alt="u1" className="rounded-circle" width="25" />
            </a>
            <a href='/' className='ms-n1'>
                <img src={user3} alt="u1" className="rounded-circle" width="25" />
            </a>
            <a href='/' className='ms-n1'>
                <img src={user4} alt="u1" className="rounded-circle" width="25" />
            </a>
        </div>
      </CardBody>
    </Card>
  );
};

export default FollowCard;
