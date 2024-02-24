import {
  Badge,
  CardBody,
  Card,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import SimpleBar from 'simplebar-react';
import user1 from '../../../assets/images/users/user1.jpg';
import user2 from '../../../assets/images/users/user2.jpg';
import user3 from '../../../assets/images/users/user3.jpg';
import user4 from '../../../assets/images/users/user4.jpg';
import user5 from '../../../assets/images/users/user5.jpg';

const commentsData = [
  {
    image: user1,
    name: 'James Anderson',
    comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Pending',
    date: 'April 14, 2022',
  },
  {
    image: user2,
    name: 'Michael Jorden',
    comment: 'Rpsum is simply dummy text of the printing and type setting industry.',
    status: 'Approved',
    date: 'May 14, 2022',
  },
  {
    image: user3,
    name: 'Johnathan Doeting',
    comment: 'Frem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Approved',
    date: 'June 14, 2022',
  },
  {
    image: user4,
    name: 'Daniel Kristeen',
    comment: 'LorTsum is simply dummy text of the printing and type setting industry.',
    status: 'Pending',
    date: 'July 14, 2022',
  },
  {
    image: user5,
    name: 'Jan Petrovic',
    comment: 'Mem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Rejected',
    date: 'Aug 14, 2022',
  },
  {
    image: user1,
    name: 'Hanna Gover',
    comment: 'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    status: 'Pending',
    date: 'April 14, 2022',
  },
];

const RecentComments = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Recent Comments</CardTitle>
      </CardBody>
      <SimpleBar style={{ height: '600px' }}>
        <ListGroup flush>
          {commentsData.map((icomment) => (
            <ListGroupItem action href="#" tag="a" key={icomment.name} className="d-flex p-3 w-100">
              <div>
                <img src={icomment.image} alt="user" width="50" className="rounded-circle me-3" />
              </div>
              <div className="w-100">
                <ListGroupItemHeading className="fw-medium mb-0">
                  {icomment.name}
                </ListGroupItemHeading>
                <ListGroupItemText className="my-1 text-muted">
                  {icomment.comment}
                </ListGroupItemText>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <small className="text-muted">{icomment.date}</small>
                  <div>
                    {icomment.status === 'Pending' ? (
                      <Badge color="primary" className="text-dark-white">
                        Pending
                      </Badge>
                    ) : icomment.status === 'Rejected' ? (
                      <Badge color="danger" className="text-dark-white">
                        Rejected
                      </Badge>
                    ) : (
                      <Badge color="cyan" className="text-dark-white">
                        Approved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </SimpleBar>
    </Card>
  );
};

export default RecentComments;
