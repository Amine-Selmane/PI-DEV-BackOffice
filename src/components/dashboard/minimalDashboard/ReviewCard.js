import { Card, CardBody } from 'reactstrap';
import user1 from '../../../assets/images/users/user2.jpg';

const ReviewCard = () => {
  return (
    <Card className="bg-primary text-white ">
      <CardBody className="d-flex align-items-start flex-column">
        <div className='mb-4'>
        <p className="fs-4 mb-4">My Acting blown Your Mind and you also laugh at the moment</p>
        <span className="op-5">- 2 mins ago</span>
        </div>
        
        <div className="mt-auto d-flex align-items-center justify-content-start gap-3">
          <img
            src={user1}
            className="rounded-circle"
            alt="avatar"
            width="45"
            height="45"
          />
          <div>
              <h5 className='mb-0'>John Deo</h5>
              <span className='op-5'>SEO Manager</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
